'use strict'

let BinaryUtil = require('./node/BinaryUtil')
let emitter = require('./node/emitter')
let timeUtil = require('./node/timeUtil')
let ClickCount = require('./react/ClickCount')

/*
### loading electron fails inside node_module
###
autoUpdater: require('./electron/autoUpdater'),
createWindow: require('./electron/createWindow'),
*/

/*
### Because loading realm inside node_module fails,
### tools for realm is not installed here.
realmUtil: require('./realm/realmUtil'),
schema: require('./realm/schema'),
*/

module.exports = {
  BinaryUtil: BinaryUtil,
  emitter: emitter,
  timeUtil: timeUtil,
  ClickCount: ClickCount
}
