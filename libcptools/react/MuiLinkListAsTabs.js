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

var _Tabs = require('material-ui/Tabs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MuiLinkListAsTabs = function (_Component) {
  (0, _inherits3.default)(MuiLinkListAsTabs, _Component);

  function MuiLinkListAsTabs(props) {
    (0, _classCallCheck3.default)(this, MuiLinkListAsTabs);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MuiLinkListAsTabs.__proto__ || (0, _getPrototypeOf2.default)(MuiLinkListAsTabs)).call(this, props));

    _this.state = {
      activeTab: ''
    };

    _this.onClickTab = _this.onClickTab.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MuiLinkListAsTabs, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.props.history.listen(function (location) {
        // console.log('ROUTE CHANGED', location)
        var pathname = location.pathname;
        // ===> /muiCompTabs/1
        // sync active selected Tab item
        _this2.setState({ activeTab: pathname });
      });

      // set activeTab
      var active = null;
      var index = !this.props.initialIndex ? 0 : this.props.initialIndex;
      if (this.props.links.length > 0) {
        // set activeTab
        active = this.props.links[index].path;
      }
      // console.log('activeTab', active)
      this.setState({ activeTab: active });
      this.clickLinkItem = this.clickLinkItem.bind(this);
    }
  }, {
    key: 'clickLinkItem',
    value: function clickLinkItem(index) {
      // 0, 1, 2, ...
      try {
        var obj = this.props.links[index];
        this.onClickItem(obj);
      } catch (err) {}
    }
  }, {
    key: 'onClickTab',
    value: function onClickTab(obj) {
      // console.log('onClickTab', obj)

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
      this.setState({ activeTab: obj.path });
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
        // console.log('MuiLinkListAsTabs elem', elem, 'index', index)
        return _react2.default.createElement(_Tabs.Tab, {
          key: index,
          label: elem.title,
          value: elem.path,
          onActive: function onActive() {
            _this3.onClickTab({
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
          _Tabs.Tabs,
          { value: this.state.activeTab },
          list
        )
      );
    }
  }]);
  return MuiLinkListAsTabs;
}(_react.Component);

exports.default = MuiLinkListAsTabs;