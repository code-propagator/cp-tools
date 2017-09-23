'use strict';

var au = require('../../node_modules/cp-tools/libcptools/electron/autoUpdater');

module.exports.checkVersion = au.checkVersion;
module.exports.checkUpdate = au.checkUpdate;
module.exports.updateAppIfNeeded = au.updateAppIfNeeded;