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

var _List = require('material-ui/List');

var _IndentTree = require('./IndentTree');

var _IndentTree2 = _interopRequireDefault(_IndentTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://www.material-ui.com/#/components/list
// import {List, ListItem} from 'material-ui/List'
var MuiLinkListAsTree = function (_Component) {
  (0, _inherits3.default)(MuiLinkListAsTree, _Component);

  function MuiLinkListAsTree(props) {
    (0, _classCallCheck3.default)(this, MuiLinkListAsTree);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MuiLinkListAsTree.__proto__ || (0, _getPrototypeOf2.default)(MuiLinkListAsTree)).call(this, props));

    _this.state = {
      activeItem: ''
    };
    _this.onClickItem = _this.onClickItem.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MuiLinkListAsTree, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // console.log('DID MOUNT TREE', this.props.links)

      // add history change listener
      this.props.history.listen(function (location) {
        console.log('ROUTE CHANGED IN TREE', location);
        var pathname = location.pathname;
        // ===> /muiCompTree/1
        _this2.setState({ activeItem: pathname });
      });
    }
  }, {
    key: 'clickLinkItem',
    value: function clickLinkItem(index) {
      // 0, 1, 2, ...
      try {
        var key = index; // 0, 1, 2, ...
        this.pushItemByKey(key);
        // ===> /muiCompTree/1, 2, 3, ...
      } catch (err) {}
    }
  }, {
    key: 'findTreeNodeByKey',
    value: function findTreeNodeByKey(key, omitChildren) {
      var treeItemsToRender = this.props.links;
      return _IndentTree2.default.findTreeNodeByKey(treeItemsToRender, key, omitChildren);
    }
  }, {
    key: 'findTreeItemListByRef',
    value: function findTreeItemListByRef(refId) {
      // ListItem
      return this.refs.refId;
    }
  }, {
    key: 'pushItemByKey',
    value: function pushItemByKey(key) {
      var obj = this.findTreeNodeByKey(key, true);
      console.log('found obj', obj);

      // Because we didn't setup link for route in MuiContentListWithType.js for tree,
      // route path for the current list item is generated here.
      var matchurl = this.props.match.url;
      var path = matchurl + '/' + (key + 1); // 1, 2, 3, ...
      console.log('===> route path', path);
      this.props.history.push(path);

      this.props.history.push({
        pathname: path,
        search: '?dummy=anyway',
        state: {
          path: path,
          title: obj.name,
          index: key + 1 // 1, 2, 3, ....
        }
      });

      this.setState({ activeItem: path });
    }
  }, {
    key: 'onClickItem',
    value: function onClickItem(key, refId) {
      // 0, 1, 2, ...
      console.log('MuiLinkListAsTree onClickItem', key, refId);

      this.pushItemByKey(key);
    }
  }, {
    key: 'render',
    value: function render() {
      var treeItemsToRender = this.props.links;
      console.log('RENDER treeItemsToRender NOW', treeItemsToRender);
      // List with nestedItems
      // http://www.material-ui.com/#/components/list
      var render = _IndentTree2.default.renderTree(treeItemsToRender);
      console.log(render);
      var html = require('html');
      var pretty = html.prettyPrint(render, { indent_size: 2 });
      console.log(pretty);

      var renderMui = _IndentTree2.default.renderMuiList(treeItemsToRender, this.onClickItem);

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _List.List,
          null,
          renderMui
        )
      );
    }
  }]);
  return MuiLinkListAsTree;
}(_react.Component);

exports.default = MuiLinkListAsTree;