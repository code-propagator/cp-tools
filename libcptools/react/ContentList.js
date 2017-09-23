'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LinkList = require('./LinkList');

var _LinkList2 = _interopRequireDefault(_LinkList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import {Link} from 'react-router-dom'


var ContentList = function (_Component) {
  _inherits(ContentList, _Component);

  function ContentList() {
    _classCallCheck(this, ContentList);

    return _possibleConstructorReturn(this, (ContentList.__proto__ || Object.getPrototypeOf(ContentList)).apply(this, arguments));
  }

  _createClass(ContentList, [{
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

exports.default = ContentList;