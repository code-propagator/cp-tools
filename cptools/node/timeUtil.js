'use strict'

// import moment from 'moment'
const moment = require('moment')

var TSZONE = 'YYYY-MM-DDTHH:mm:ss.SSSZ'

let currentTimestamp = () => {
  return moment().format(TSZONE)
}

let currentTimestampUTC = () => {
  return localToUTC(currentTimestamp())
}

let localToUTC = (localTS) => {
  return moment(localTS).utc().format(TSZONE)
}

let utcToLocal = (utcTS) => {
  return moment(utcTS).format(TSZONE)
}

let utcToISO = (utcTS) => {
  return moment(utcTS).toUTCString()
}

let fromStringToDate = (s) => {
  // "2017-07-15T20:13:58.586Z"
  return moment(s).toDate()
}

module.exports = {
  TSZONE,
  currentTimestamp,
  currentTimestampUTC,
  localToUTC,
  utcToLocal,
  utcToISO,
  fromStringToDate
}

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
