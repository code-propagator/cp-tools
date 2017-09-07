'use strict'

module.export.modules = {
  autoUpdater: require('./cptools/electron/autoUpdater'),
  createWindow: require('./cptools/electron/createWindow'),
  binaryUtil: require('./cptools/node/binaryUtil'),
  emitter: require('./cptools/node/emitter'),
  hashHist: require('./cptools/node/hashHist'),
  timeUtil: require('./cptools/node/timeUtil'),
  ClickCount: require('./cptools/react/ClickCount'),
  realmUtil: require('./cptools/realm/realmUtil'),
  schema: require('./cptools/realm/schema')
}
