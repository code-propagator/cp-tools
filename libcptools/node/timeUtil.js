'use strict';

// import moment from 'moment'

var moment = require('moment');

var TSZONE = 'YYYY-MM-DD HH:mm:ss.SSSZ';

var currentTimestamp = function currentTimestamp() {
  return moment().format(TSZONE);
};

var currentTimestampUTC = function currentTimestampUTC() {
  return localToUTC(currentTimestamp());
};

var localToUTC = function localToUTC(localTS) {
  return moment(localTS).utc().format(TSZONE);
};

var utcToLocal = function utcToLocal(utcTS) {
  return moment(utcTS).format(TSZONE);
};

var utcToISO = function utcToISO(utcTS) {
  return moment(utcTS).toUTCString();
};

module.exports.TSZONE = TSZONE;
module.exports.currentTimestamp = currentTimestamp;
module.exports.currentTimestampUTC = currentTimestampUTC;
module.exports.localToUTC = localToUTC;
module.exports.utcToLocal = utcToLocal;
module.exports.utcToISO = utcToISO;

/*
class timeUtil {
  constructor () {
    this.currentTimestamp = this.currentTimestamp.bind(this)
    this.localToUTC = this.localToUTC.bind(this)
    this.utcToLocal = this.utcToLocal.bind(this)
    this.currentTimestampUTC = this.currentTimestampUTC.bind(this)
  }

  currentTimestamp () {
    return moment().format(TSZONE)
  }

  currentTimestampUTC () {
    return this.localToUTC(this.currentTimestamp())
  }

  localToUTC (localTS) {
    return moment(localTS).utc().format(TSZONE)
  }

  utcToLocal (utcTS) {
    return moment(utcTS).format(TSZONE)
  }

  utcToISO (utcTS) {
    return moment(utcTS).toUTCString()
  }
}

export default timeUtil
*/