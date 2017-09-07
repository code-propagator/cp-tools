'use strict'

module.export.modules = {
  autoUpdater: require('./libcptools/electron/autoUpdater'),
  createWindow: require('./libcptools/electron/createWindow'),
  binaryUtil: require('./libcptools/node/binaryUtil'),
  emitter: require('./libcptools/node/emitter'),
  hashHist: require('./libcptools/node/hashHist'),
  timeUtil: require('./libcptools/node/timeUtil'),
  ClickCount: require('./libcptools/react/ClickCount'),
  realmUtil: require('./libcptools/realm/realmUtil'),
  schema: require('./libcptools/realm/schema')
}
