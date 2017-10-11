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

var _Menu = require('material-ui/Menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 1.0.0
// https://material-ui-1dab0.firebaseapp.com/demos/menus/
// import Menu, { MenuItem } from 'material-ui/Menu'

// 0.19.1
var MuiLinkListAsMenu = function (_Component) {
  (0, _inherits3.default)(MuiLinkListAsMenu, _Component);

  function MuiLinkListAsMenu(props) {
    (0, _classCallCheck3.default)(this, MuiLinkListAsMenu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MuiLinkListAsMenu.__proto__ || (0, _getPrototypeOf2.default)(MuiLinkListAsMenu)).call(this, props));

    _this.state = {
      activeItem: ''
    };
    _this.onClickItem = _this.onClickItem.bind(_this);
    _this.clickLinkItem = _this.clickLinkItem.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MuiLinkListAsMenu, [{
    key: 'clickLinkItem',
    value: function clickLinkItem(index) {
      // 0, 1, 2, ...
      try {
        var obj = this.props.links[index];
        this.onClickItem(obj);
      } catch (err) {}
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // add history change listener
      this.props.history.listen(function (location) {
        console.log('ROUTE CHANGED IN MENU', location);
        var pathname = location.pathname;
        // ===> /muiCompTabs/1
        // sync active selected Tab item
        _this2.setState({ activeItem: pathname });
      });

      // set activeTab
      var active = null;
      var index = !this.props.initialIndex ? 0 : this.props.initialIndex;
      if (this.props.links.length > 0) {
        // set activeItem
        active = this.props.links[index].path;
      }
      // console.log('activeItem', active)
      this.setState({ activeItem: active });
    }
  }, {
    key: 'onClickItem',
    value: function onClickItem(obj) {
      // console.log('onClickItem', obj)

      // this.props.history.push(path)
      this.props.history.push({
        pathname: obj.path,
        search: '?dummy=anyway',
        state: {
          path: obj.path,
          title: obj.title,
          index: obj.index
        }
      });
      // ===> '/muiCompTabs/1', 2, 3, ...

      // Bacause we are using 'value' for selected Tab,
      // activeTab should be updated to see view updated.
      this.setState({ activeItem: obj.path });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      // https://stackoverflow.com/questions/41638688/material-uis-tabs-integration-with-react-router-4
      // ### Use Tabs component just like a list.
      // ### Don't insert any child object in the Tab itself.
      // ### The contents will be placed by Router!
      // {path:'/aaa', title:'To aaa'}, ...]
      // https://stackoverflow.com/questions/39543322/set-material-ui-tab-active-based-on-visited-route
      var list = this.props.links.map(function (elem, index) {
        // console.log('MuiLinkListAsMenu elem', elem, 'index', index)
        return _react2.default.createElement(_MenuItem2.default, {
          key: index,
          primaryText: elem.title,
          value: elem.path,
          onClick: function onClick() {
            _this3.onClickItem({
              path: elem.path,
              title: elem.title,
              index: index // 0, 1, 2, ...
            });
          }
        });
      });
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _Menu2.default,
          { value: this.state.activeItem },
          list
        )
      );
    }
  }]);
  return MuiLinkListAsMenu;
}(_react.Component);

exports.default = MuiLinkListAsMenu;