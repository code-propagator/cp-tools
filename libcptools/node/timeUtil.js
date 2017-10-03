'use strict';

// import moment from 'moment'

var moment = require('moment');

var TSZONE = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

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

var fromStringToDate = function fromStringToDate(s) {
  // "2017-07-15T20:13:58.586Z"
  return moment(s).toDate();
};

module.exports = {
  TSZONE: TSZONE,
  currentTimestamp: currentTimestamp,
  currentTimestampUTC: currentTimestampUTC,
  localToUTC: localToUTC,
  utcToLocal: utcToLocal,
  utcToISO: utcToISO,
  fromStringToDate: fromStringToDate

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

};