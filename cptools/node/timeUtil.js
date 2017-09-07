'use strict'

// import moment from 'moment'
const moment = require('moment')

const TSZONE = 'YYYY-MM-DD HH:mm:ss.SSSZ'

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
