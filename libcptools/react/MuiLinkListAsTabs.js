'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tabs = require('material-ui/Tabs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MuiLinkListAsTabs = function (_Component) {
  _inherits(MuiLinkListAsTabs, _Component);

  function MuiLinkListAsTabs(props) {
    _classCallCheck(this, MuiLinkListAsTabs);

    var _this = _possibleConstructorReturn(this, (MuiLinkListAsTabs.__proto__ || Object.getPrototypeOf(MuiLinkListAsTabs)).call(this, props));

    _this.state = {
      activeTab: ''
    };

    _this.onClickTab = _this.onClickTab.bind(_this);
    return _this;
  }

  _createClass(MuiLinkListAsTabs, [{
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