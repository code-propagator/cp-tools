'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LinkList = require('./LinkList');

var _LinkList2 = _interopRequireDefault(_LinkList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ContentList = function (_Component) {
  (0, _inherits3.default)(ContentList, _Component);

  function ContentList() {
    (0, _classCallCheck3.default)(this, ContentList);
    return (0, _possibleConstructorReturn3.default)(this, (ContentList.__proto__ || (0, _getPrototypeOf2.default)(ContentList)).apply(this, arguments));
  }

  (0, _createClass3.default)(ContentList, [{
    key: 'render',
    value: function render() {
      if (!this.props) {
        return _react2.default.createElement('div', null);
      }

      // console.log('ContentList has contents', this.props.contents)

      var matchurl = this.props.match.url;
      console.log('matrch.url', matchurl);

      var links = [];
      this.props.contents.map(function (elem, index) {
        var path = matchurl + '/' + index;
        // /routeOne/0, 1, 2, ... ### DON'T START WITH 1, JUST USE 0
        var title = 'link to ' + path;
        if (elem.linktitle) {
          title = elem.linktitle;
        }
        // {path: '/routeOne/0', title:'link to /routeOne/0'}
        links.push({ path: path, title: title });
      });
      return _react2.default.createElement(_LinkList2.default, { links: links });
    }
  }]);
  return ContentList;
}(_react.Component);
// import {Link} from 'react-router-dom'


exports.default = ContentList;