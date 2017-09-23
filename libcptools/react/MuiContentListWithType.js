'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LINKLIST_TYPES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MuiLinkListAsTabs = require('./MuiLinkListAsTabs');

var _MuiLinkListAsTabs2 = _interopRequireDefault(_MuiLinkListAsTabs);

var _MuiLinkListAsMenu = require('./MuiLinkListAsMenu');

var _MuiLinkListAsMenu2 = _interopRequireDefault(_MuiLinkListAsMenu);

var _MuiLinkListAsTree = require('./MuiLinkListAsTree');

var _MuiLinkListAsTree2 = _interopRequireDefault(_MuiLinkListAsTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import {Link} from 'react-router-dom'


var LINKLIST_TYPES = exports.LINKLIST_TYPES = {
  TYPE_TABS: 'MuiLinkListAsTabs',
  TYPE_MENU: 'MuiLinkListAsPopover',
  TYPE_TREE: 'MuiLinkListAsTree'
};

var MuiContentListWithType = function (_Component) {
  _inherits(MuiContentListWithType, _Component);

  function MuiContentListWithType(props) {
    _classCallCheck(this, MuiContentListWithType);

    var _this = _possibleConstructorReturn(this, (MuiContentListWithType.__proto__ || Object.getPrototypeOf(MuiContentListWithType)).call(this, props));

    _this.setupLinksForFlatList = _this.setupLinksForFlatList.bind(_this);
    _this.setupLinksForTree = _this.setupLinksForTree.bind(_this);
    return _this;
  }

  // used from outside


  _createClass(MuiContentListWithType, [{
    key: 'clickLinkItem',
    value: function clickLinkItem(index) {
      if (!this.props.contents) {
        return;
      }
      if (!this.props.contents.length) {
        return;
      }
      if (index < 0 && index >= this.props.contents.length) {
        return;
      }
      // for convenience, send message to change the route to link list (Tabs, Menu, ...)
      this.refs.linklist.clickLinkItem(index);
    }
  }, {
    key: 'setupLinksForFlatList',
    value: function setupLinksForFlatList() {
      var matchurl = this.props.match.url;
      // console.log('matrch.url', matchurl)

      var links = [];
      this.props.contents.map(function (elem, index) {
        // Set up route for the elem
        var path = matchurl + '/' + index;
        // /routeOne/0, 1, 2, ... ### DON'T START WITH 1, JUST USE 0
        var title = 'link to ' + path; // default title
        if (elem.linktitle) {
          title = elem.linktitle;
        }
        // {path: '/routeOne/1', title:'link to /routeOne/1'}
        links.push({
          path: path, // /routeOne/0
          title: title // link to AAA
        });
      });
      return links;
    }
  }, {
    key: 'setupLinksForTree',
    value: function setupLinksForTree() {
      var links = this.props.contents;
      // ### for Tree, the contents contains tree items
      // ### just forward tree data
      return links;
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props) {
        return _react2.default.createElement('div', null);
      }
      // console.log('ContentList has contents', this.props.contents)
      var type = this.props.type;
      if (type === LINKLIST_TYPES.TYPE_TABS) {
        return _react2.default.createElement(_MuiLinkListAsTabs2.default, _extends({ ref: 'linklist', links: this.setupLinksForFlatList(), history: this.props.history }, this.props));
      } else if (type === LINKLIST_TYPES.TYPE_MENU) {
        return _react2.default.createElement(_MuiLinkListAsMenu2.default, _extends({ ref: 'linklist', links: this.setupLinksForFlatList(), history: this.props.history }, this.props));
      } else if (type === LINKLIST_TYPES.TYPE_TREE) {
        return _react2.default.createElement(_MuiLinkListAsTree2.default, _extends({ ref: 'linklist', links: this.setupLinksForTree(), history: this.props.history }, this.props));
      }
    }
  }]);

  return MuiContentListWithType;
}(_react.Component);

exports.default = MuiContentListWithType;