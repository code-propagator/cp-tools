'use strict'

let BinaryUtil = require('./libcptools/node/BinaryUtil')
let emitter = require('./libcptools/node/emitter')
let hashHist = require('./libcptools/node/hashHist')
let timeUtil = require('./libcptools/node/timeUtil')
let ClickCount = require('./libcptools/react/ClickCount')

/*
### loading electron fails inside node_module
###
autoUpdater: require('./libcptools/electron/autoUpdater'),
createWindow: require('./libcptools/electron/createWindow'),
*/
/*
### Because loading realm inside node_module fails,
### tools for realm is not installed here.
realmUtil: require('./libcptools/realm/realmUtil'),
schema: require('./libcptools/realm/schema'),
*/

module.exports = {
  BinaryUtil: BinaryUtil,
  emitter: emitter,
  hashHist: hashHist,
  timeUtil: timeUtil,
  ClickCount: ClickCount
}
