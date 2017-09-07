'use strict';

// import moment from 'moment'

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var moment = require('moment');

var TSZONE = 'YYYY-MM-DD HH:mm:ss.SSSZ';

var timeUtil = function () {
  function timeUtil() {
    _classCallCheck(this, timeUtil);

    this.currentTimestamp = this.currentTimestamp.bind(this);
    this.localToUTC = this.localToUTC.bind(this);
    this.utcToLocal = this.utcToLocal.bind(this);
    this.currentTimestampUTC = this.currentTimestampUTC.bind(this);
  }

  _createClass(timeUtil, [{
    key: 'currentTimestamp',
    value: function currentTimestamp() {
      return moment().format(TSZONE);
    }
  }, {
    key: 'currentTimestampUTC',
    value: function currentTimestampUTC() {
      return this.localToUTC(this.currentTimestamp());
    }
  }, {
    key: 'localToUTC',
    value: function localToUTC(localTS) {
      return moment(localTS).utc().format(TSZONE);
    }
  }, {
    key: 'utcToLocal',
    value: function utcToLocal(utcTS) {
      return moment(utcTS).format(TSZONE);
    }
  }, {
    key: 'utcToISO',
    value: function utcToISO(utcTS) {
      return moment(utcTS).toUTCString();
    }
  }]);

  return timeUtil;
}();

exports.default = timeUtil;