'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _MuiCompLogin = require('cp-tools/libcptools/react/MuiCompLogin');

var _MuiCompLogin2 = _interopRequireDefault(_MuiCompLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var uuidv4 = require('uuid/v4');

var MuiAppLogin = function (_Component) {
  _inherits(MuiAppLogin, _Component);

  function MuiAppLogin(props) {
    _classCallCheck(this, MuiAppLogin);

    var _this = _possibleConstructorReturn(this, (MuiAppLogin.__proto__ || Object.getPrototypeOf(MuiAppLogin)).call(this, props));

    _this.state = {
      instanceId: uuidv4()
    };
    return _this;
  }

  _createClass(MuiAppLogin, [{
    key: 'handleClick',
    value: function handleClick() {
      this.requestLatestData();
    }
  }, {
    key: 'render',
    value: function render() {
      var appBarStyle = this.props.appBarStyle;
      var title = this.props.title;
      var myLoginConf = this.props.myLoginConf;
      var history = this.props.history;
      var nextRoute = this.props.nextRoute;
      var backRoute = this.props.backRoute;
      var rendererApi = this.props.rendererApi;
      return _react2.default.createElement(
        'div',
        { ref: this.state.instanceId },
        _react2.default.createElement(
          'h2',
          null,
          'MuiAppLogin:',
          this.state.instanceId
        ),
        _react2.default.createElement(_AppBar2.default, {
          style: appBarStyle,
          title: _react2.default.createElement(
            'div',
            null,
            title
          ),
          showMenuIconButton: false
        }),
        _react2.default.createElement(_MuiCompLogin2.default, {
          loginConf: myLoginConf,
          history: history,
          nextRoute: nextRoute,
          backRoute: backRoute,
          rendererApi: rendererApi })
      );
    }
  }]);

  return MuiAppLogin;
}(_react.Component);

exports.default = MuiAppLogin;