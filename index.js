const hello = (name) => {
  console.log('hello', name)
}

let nodereact = require('./cptools/index.js')

module.exports = {
  hello: hello,
  BinaryUtil: nodereact.BinaryUtil,
  emitter: nodereact.emitter,
  timeUtil: nodereact.timeUtil,
  ClickCount: nodereact.ClickCount
}
