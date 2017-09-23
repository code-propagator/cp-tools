'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('material-ui/List');

var _IndentTree = require('./IndentTree');

var _IndentTree2 = _interopRequireDefault(_IndentTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// http://www.material-ui.com/#/components/list
// import {List, ListItem} from 'material-ui/List'


var MuiLinkListAsTree = function (_Component) {
  _inherits(MuiLinkListAsTree, _Component);

  function MuiLinkListAsTree(props) {
    _classCallCheck(this, MuiLinkListAsTree);

    var _this = _possibleConstructorReturn(this, (MuiLinkListAsTree.__proto__ || Object.getPrototypeOf(MuiLinkListAsTree)).call(this, props));

    _this.state = {
      activeItem: ''
    };
    _this.onClickItem = _this.onClickItem.bind(_this);
    return _this;
  }

  _createClass(MuiLinkListAsTree, [{
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