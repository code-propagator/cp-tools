'use strict'

import {TextDecoder, TextEncoder} from 'text-encoding'

class binaryUtil {
  constructor () {
    console.log('BINARY UTIL')

    this.longToByteArray = this.longToByteArray.bind(this)
    this.byteArrayToLong = this.byteArrayToLong.bind(this)
    this.testLong = this.testLong.bind(this)
    this.bytesFromHex = this.bytesFromHex.bind(this)

    this.jsIntToBytes = this.jsIntToBytes.bind(this)
    this.jsIntTo4Bytes = this.jsIntTo4Bytes.bind(this)
    this.bytesToJsInt = this.bytesToJsInt.bind(this)

    this.readMessage = this.readMessage.bind(this)
    this.dispatchMessage = this.dispatchMessage.bind(this)

    this.type0001 = this.type0001.bind(this)
    this.typeARGB = this.typeARGB.bind(this)
    this.typeKEEP = this.typeKEEP.bind(this)
    this.typeUTF8 = this.typeUTF8.bind(this)

    this.canvasImageData = this.canvasImageData.bind(this)

    this.make0001 = this.make0001.bind(this)
    this.makeARGB = this.makeARGB.bind(this)
    this.makeKEEP = this.makeKEEP.bind(this)
    this.makeUTF8 = this.makeUTF8.bind(this)
  }

  // ###################################################
  // long (8 bytes）Number ---> ByteArray
  // http://stackoverflow.com/questions/8482309/converting-javascript-integer-to-byte-array-and-back
  longToByteArray (long) {
    // we want to represent the input as a 8-bytes array
    var byteArray = [0, 0, 0, 0, 0, 0, 0, 0]
    for (var index = 0; index < byteArray.length; index++) {
      var byte = long & 0xff
      byteArray[index] = byte
      long = (long - byte) / 256
    }
    return byteArray
  }

  byteArrayToLong (byteArray) {
    var value = 0
    for (var i = byteArray.length - 1; i >= 0; i--) {
      value = (value * 256) + byteArray[i]
    }
    return value
  }

  testLong (value) {
    console.log('value', value)
    var baLong = this.longToByteArray(value)
    console.log('baLong', baLong)
    var valLong = this.byteArrayToLong(baLong)
    console.log('valLong is SAME? ', valLong + ',' + (valLong === value))
  }

  // http://stackoverflow.com/questions/10253601/converting-large-integer-to-8-byte-array-in-javascript
  bytesFromHex (str, pad) {
    if (str.length % 2) str = '0' + str
    var bytes = str.match(/../g).map((s) => {
      return parseInt(s, 16)
    })
    if (pad) {
      for (var i = bytes.length; i < pad; ++i) {
        bytes.unshift(0)
      }
    }
    return bytes
  }

  // ###################################################
  // JavaScript [0, 2^53-1] integer ---> 8 bytes array
  jsIntToBytes (v, f) {
    var c = 0
    var jsIntBytes = [0, 0, 0, 0, 0, 0, 0, 0]
    // ### 8 bytes instead of 7 bytes

    // ### negative is not handled
    if (v < 0) {
      // console.log("Cannot handle negative value: " + v);
      f(null)
      return
    }

    // ### JavaScript's max integer
    var jsIntMax = 9007199254740991
    if (v > jsIntMax) {
      // console.log("The value " + v + " exceeds JavaScript's max int value 9007199254740991.");
      f(null)
      return
    }

    var testValue = (v) => {
      c++
      if (c >= 8) {
        jsIntBytes[7 - 7] = 0
        // console.log("-->" + jsIntBytes);
        c = 0
        f(jsIntBytes)
        return
      }
      var b = Number(v % 256)
      var r = Number(v - b)
      v = Number(r / 256)
      jsIntBytes[7 - (c - 1)] = b

      // console.log("b = " + b + ",  r = " + r + ", value = " + v);
      testValue(v, f)
    }

    testValue(v, f)
  }

  // JavaScriptの[0, 2^31-1] integer ---> 4 bytes array
  // ### for Java int, such like image width and height, etc...
  jsIntTo4Bytes (v, f) {
    if (v < 0) {
      f(null)
      return
    }
    if (v > 2147483647) {
      f(null)
      return
    }

    // 8 bytes ---> 4 bytes
    this.jsIntToBytes(
      v,
      (res) => {
        f([res[4], res[5], res[6], res[7]])
      }
    )
  }

  // bytes to number
  // 8 bytes array ( or 4 bytes array) ---> integer（[0, 2^53-1]）
  bytesToJsInt (bytes) {
    if (bytes == null) return null

    var value = 0
    for (var i = 0; i < bytes.length; i++) {
      value = Number((value * 256) + bytes[i])
    }

    return (Number(value))
  }

  // #####################################################
  // Message
  // [Type 4 bytes][Data length 8 bytes][Data body]
  readMessage (arrayBuffer, readCallback) {
    var uint8s = new Uint8Array(arrayBuffer)
    console.log('RCV DATA LEN = ' + uint8s.length)
    // for (var i=0; i< uint8s.length; i++) {
    // console.log("[" + i + "]: " + uint8s[i])
    // console.log("--- 0x" + uint8s[i].toString(16))
    // }

    // ####
    // Message type
    var messageType = [uint8s[0], uint8s[1], uint8s[2], uint8s[3]]

    // Data length (8 bytes representation)
    var baDataLen = [uint8s[4], uint8s[5], uint8s[6], uint8s[7],
      uint8s[8], uint8s[9], uint8s[10], uint8s[11]]
    console.log('DATA LEN representation' + baDataLen)

    // Data length value
    var dataLen = this.bytesToJsInt(baDataLen)
    console.log('★★★ DATA LEN：' + dataLen)

    // Data body
    var buf = new ArrayBuffer(dataLen)
    var bytes = new Uint8Array(buf)

    if (dataLen > 0) {
      console.log('DATA LENGTH IS ' + dataLen)
      for (var j = 0; j < dataLen; j++) {
        bytes[j] = uint8s[12 + j]
      }
    } else {
      console.log('DATA LENGTH IS NULL')
      // ### Empty body with 0 size should be allowed
    }

    this.dispatchMessage(messageType, bytes, readCallback)
  }

  dispatchMessage (messageType, bytes, callback) {
    this.typeKEEP(messageType, bytes, callback)
    this.typeUTF8(messageType, bytes, callback)
    this.type0001(messageType, bytes, callback)
    this.typeARGB(messageType, bytes, callback)
  }

  typeKEEP (messageType, bytes, keepCallback) {
    if (messageType[0] === 0x4b && messageType[1] === 0x45 &&
      messageType[2] === 0x45 && messageType[3] === 0x50) {
      console.log('GOT RESPONSE TO KEEP ALIVE')
      keepCallback({
        type: 'KEEP',
        info: 'GOT RESPONSE TO KEEP ALIVE'
      })
    }
  }

  typeUTF8 (messageType, bytes, utf8Callback) {
    if (messageType[0] === 0x55 && messageType[1] === 0x54 &&
      messageType[2] === 0x46 && messageType[3] === 0x38) {
      // handle byte array as a string
      var decoded = new TextDecoder('UTF-8').decode(bytes)
      console.log('==>' + decoded)
      utf8Callback({
        type: 'UTF8',
        info: decoded
      })
    }
  }

  type0001 (messageType, bytes, callback0001) {
    if (messageType[0] === 0x00 && messageType[1] === 0x00 &&
      messageType[2] === 0x00 && messageType[3] === 0x01) {
      // handle byte array as a string
      var decoded = new TextDecoder('UTF-8').decode(bytes)
      console.log('==>' + decoded)
      callback0001({
        type: '0001',
        info: decoded
      })
    }
  }

  typeARGB (messageType, bytes, argbCallback) {
    if (messageType[0] === 0x41 && messageType[1] === 0x52 &&
      messageType[2] === 0x47 && messageType[3] === 0x42) {
      // Image
      // height width、pixcels

      // ### Not like JPEG, PNG, ...
      // ### ARGB bytes are assumed suitable for JavaScript HTML5 Canvas
      // ###
      var imageWidth = this.bytesToJsInt([bytes[0], bytes[1], bytes[2], bytes[3]])
      var imageHeight = this.bytesToJsInt([bytes[4], bytes[5], bytes[6], bytes[7]])
      console.log('===>HEIGHT [0,1,2,3] = ' + bytes[0] + ' ' + bytes[1] + ' ' +
       bytes[2] + ' ' + bytes[3] + ' ===> ' + imageWidth)
      console.log('===>WIDTH [4,5,6,7] = ' + bytes[4] + ' ' + bytes[5] + ' ' +
       bytes[6] + ' ' + bytes[7] + ' ===> ' + imageHeight)
      console.log('===>IMAGE [8,9,10,11] = ' + bytes[8] + ' ' + bytes[9] + ' ' +
       bytes[10] + ' ' + bytes[11])
      argbCallback({
        type: 'ARGB',
        info: {
          imageWidth: imageWidth,
          imageHeight: imageHeight,
          bytes: bytes
        }
      })
    }
  }

  canvasImageData (canvas, x, y, imageWidth, imageHeight, bytes) {
    // var canvas = document.getElementById('canvas');
    // if ( ! canvas || ! canvas.getContext ) {
    // return
    // }

    var ctx = canvas.getContext('2d')
    ctx.save()

    var imageData = ctx.createImageData(imageWidth, imageHeight)
    // specify pixcel color one by one
    for (var i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i + 0] = bytes[i + 1] // R
      imageData.data[i + 1] = bytes[i + 2] // G
      imageData.data[i + 2] = bytes[i + 3] // B
      imageData.data[i + 3] = bytes[i + 0] // A
    }
    ctx.putImageData(imageData, x, y)

    ctx.restore()
  }

  makeKEEP (callback) {
    var buffer = new ArrayBuffer(4 + 8)
    // dispMessage('CREATE BUFFER:' + buffer)
    let cb = callback
    try {
      var byteArray = new Uint8Array(buffer)
      byteArray[0] = 0x4b // K
      byteArray[1] = 0x45 // E
      byteArray[2] = 0x45 // E
      byteArray[3] = 0x50 // P

      let bytesToJsInt = this.bytesToJsInt
      this.jsIntToBytes(0, (res) => {
        console.log('#### LEN BYTES ####' + res + ' ==> ' + bytesToJsInt(res))
        // data size(0)'s 8 bytes representation
        for (var k = 0; k < 8; k++) {
          byteArray[4 + k] = res[k]
        }
        // NO DATA BODY

        // send buffer
        // wsb.send(byteArray.buffer);

        cb(byteArray.buffer)
      })
    } catch (err) {
      console.log('ERROR:' + err)
      cb(null)
    }
  }

  makeUTF8 (str, utf8Callback) {
    if ((!str) || str === '') {
      console.log('DATA CONTENS IS EMPTY')
      utf8Callback(null)
      return
    }
    let cb = utf8Callback
    try {
      // handle data array as a string
      var utf8Bytes = new TextEncoder('UTF-8').encode(str)

      // console.log('SEND AS BYTES:')
      // for (var c = 0; c < utf8Bytes.length; c++) {
      //   console.log('c['+c+'] = ' + utf8Bytes[c])
      // }

      // send buffer
      // wsb.send(utf8Bytes.buffer);
      // ### instead of utf8Bytes.buffer, request form is used

      var baDataLen = utf8Bytes.length
      console.log('UTF8 BYTE LEN: ' + baDataLen)

      // request byte array
      var buffer = new ArrayBuffer(4 + 8 + baDataLen)

      // mesage type
      var byteArray = new Uint8Array(buffer)
      byteArray[0] = 0x55 // U
      byteArray[1] = 0x54 // T
      byteArray[2] = 0x46 // F
      byteArray[3] = 0x38 // 8
      // byteArray[3] = 0x61 // a
      // byteArray[3] = 0x63 // c
      // byteArray[3] = 0x6d // m
      // let bytesToJsInt = this.bytesToJsInt
      this.jsIntToBytes(baDataLen, (res) => {
        // dispMessage("## LEN BYTES ##" + res + ' ==>  + bytesToJsInt(res))

        // data size(0) ---> 8 bytes representation
        for (var k = 0; k < 8; k++) {
          byteArray[4 + k] = res[k]
        }

        // data body
        for (var j = 0; j < baDataLen; j++) {
          byteArray[12 + j] = utf8Bytes[j]
        }

        // send buffer
        // wsb.send(byteArray.buffer);
        cb(byteArray.buffer)
      })
    } catch (err) {
      console.log('ERROR:' + err)
      cb(null)
    }
  }

  make0001 (callback) {
    var imgInfo = 'SEND IMAGE PLEASE'
    let cb = callback
    try {
      var utf8Bytes = new TextEncoder('UTF-8').encode(imgInfo)

      var baDataLen = utf8Bytes.length
      console.log('UTF8 BYTE LEN: ' + baDataLen)

      // get byte array for request
      var buffer = new ArrayBuffer(4 + 8 + baDataLen)

      // message type
      var byteArray = new Uint8Array(buffer)
      byteArray[0] = 0x00
      byteArray[1] = 0x00
      byteArray[2] = 0x00
      byteArray[3] = 0x01

      // let bytesToJsInt = this.bytesToJsInt
      this.jsIntToBytes(baDataLen, (res) => {
        // dispMessage('## LEN BYTES ##' + res + ' ==> ' + bytesToJsInt(res))

        // data size(0) ---> 8 bytes representation
        for (var k = 0; k < 8; k++) {
          byteArray[4 + k] = res[k]
        }

        // data body
        for (var j = 0; j < baDataLen; j++) {
          byteArray[12 + j] = utf8Bytes[j]
        }

        // send buffer
        // wsb.send(byteArray.buffer);
        cb(byteArray.buffer)
      })
    } catch (err) {
      console.log('ERROR:' + err)
      cb(null)
    }
  }

  makeARGB (canvas, x, y, callback) {
    let cb = callback
    try {
      var ctx = canvas.getContext('2d')
      var width = canvas.width
      var height = canvas.height
      var imageData = ctx.getImageData(x, y, width - x, height - y)
      var imageBytes = imageData.data
      // var imageBytes = []
      // for (var idx = 0; idx < (width*height*4); idx++) {
      //  imageBytes[idx] = idx%256
      // }

      // data body
      var baDataLen = 4 + 4 + (width * height * 4)

      // request bytes
      var buffer = new ArrayBuffer(4 + 8 + baDataLen)

      // message type
      var byteArray = new Uint8Array(buffer)
      byteArray[0] = 0x41 // A
      byteArray[1] = 0x52 // R
      byteArray[2] = 0x47 // G
      byteArray[3] = 0x42 // B

      // Java 4 bytes integer [0, 2^31-1] ---> byte array representation
      let jsIntTo4Bytes = this.jsIntTo4Bytes
      let jsIntToBytes = this.jsIntToBytes
      let bytesToJsInt = this.bytesToJsInt

      this.jsIntTo4Bytes(width, (widthBytes) => {
        // byte array representation of width
        // ===> get height's too
        jsIntTo4Bytes(height, (heightBytes) => {
          // bytearray representation of height

          console.log('IMAGE widthBytes: ' + widthBytes +
            ', heightBytes: ' + heightBytes)

          // data length's 8 bytes representation
          jsIntToBytes(baDataLen, (res) => {
            console.log('**** LEN BYTES ****' + res + ' ==> ' + bytesToJsInt(res))

            // DATA SIZE(0) 8 bytes representation
            for (var k = 0; k < 8; k++) {
              byteArray[4 + k] = res[k]
            }

            // BODY
            // [widthBytes][heightBytes][ARGB bytes]

            byteArray[12 + 0] = widthBytes[0]
            byteArray[12 + 1] = widthBytes[1]
            byteArray[12 + 2] = widthBytes[2]
            byteArray[12 + 3] = widthBytes[3]

            byteArray[16 + 0] = heightBytes[0]
            byteArray[16 + 1] = heightBytes[1]
            byteArray[16 + 2] = heightBytes[2]
            byteArray[16 + 3] = heightBytes[3]

            // RGBA ---> ARGB
            for (var j = 0; j < baDataLen; j = j + 4) {
              byteArray[20 + j + 0] = imageBytes[j + 3] // A
              byteArray[20 + j + 1] = imageBytes[j + 0] // R
              byteArray[20 + j + 2] = imageBytes[j + 1] // G
              byteArray[20 + j + 3] = imageBytes[j + 2] // B
            }
            // #####################
            // Take care of large buffer size and server limit

            // Send buffer
            // wsb.send(byteArray.buffer);
            cb(byteArray.buffer)
          })
        })
      })
    } catch (err) {
      console.log('ERROR:' + err)
      cb(null)
    }
  }
}

export default binaryUtil
