'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LINKLIST_TYPES = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _MuiLinkListAsTabs = require('./MuiLinkListAsTabs');

var _MuiLinkListAsTabs2 = _interopRequireDefault(_MuiLinkListAsTabs);

var _MuiLinkListAsMenu = require('./MuiLinkListAsMenu');

var _MuiLinkListAsMenu2 = _interopRequireDefault(_MuiLinkListAsMenu);

var _MuiLinkListAsTree = require('./MuiLinkListAsTree');

var _MuiLinkListAsTree2 = _interopRequireDefault(_MuiLinkListAsTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LINKLIST_TYPES = exports.LINKLIST_TYPES = {
  TYPE_TABS: 'MuiLinkListAsTabs',
  TYPE_MENU: 'MuiLinkListAsPopover',
  TYPE_TREE: 'MuiLinkListAsTree'
};
// import {Link} from 'react-router-dom'

var MuiContentListWithType = function (_Component) {
  (0, _inherits3.default)(MuiContentListWithType, _Component);

  function MuiContentListWithType(props) {
    (0, _classCallCheck3.default)(this, MuiContentListWithType);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MuiContentListWithType.__proto__ || (0, _getPrototypeOf2.default)(MuiContentListWithType)).call(this, props));

    _this.setupLinksForFlatList = _this.setupLinksForFlatList.bind(_this);
    _this.setupLinksForTree = _this.setupLinksForTree.bind(_this);
    return _this;
  }

  // used from outside


  (0, _createClass3.default)(MuiContentListWithType, [{
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
        return _react2.default.createElement(_MuiLinkListAsTabs2.default, (0, _extends3.default)({ ref: 'linklist', links: this.setupLinksForFlatList(), history: this.props.history }, this.props));
      } else if (type === LINKLIST_TYPES.TYPE_MENU) {
        return _react2.default.createElement(_MuiLinkListAsMenu2.default, (0, _extends3.default)({ ref: 'linklist', links: this.setupLinksForFlatList(), history: this.props.history }, this.props));
      } else if (type === LINKLIST_TYPES.TYPE_TREE) {
        return _react2.default.createElement(_MuiLinkListAsTree2.default, (0, _extends3.default)({ ref: 'linklist', links: this.setupLinksForTree(), history: this.props.history }, this.props));
      }
    }
  }]);
  return MuiContentListWithType;
}(_react.Component);

exports.default = MuiContentListWithType;