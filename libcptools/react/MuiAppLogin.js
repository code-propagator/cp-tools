'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _AppBar = require('material-ui/AppBar');

var _AppBar2 = _interopRequireDefault(_AppBar);

var _MuiCompLogin = require('cp-tools/libcptools/react/MuiCompLogin');

var _MuiCompLogin2 = _interopRequireDefault(_MuiCompLogin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uuidv4 = require('uuid/v4');

var MuiAppLogin = function (_Component) {
  (0, _inherits3.default)(MuiAppLogin, _Component);

  function MuiAppLogin(props) {
    (0, _classCallCheck3.default)(this, MuiAppLogin);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MuiAppLogin.__proto__ || (0, _getPrototypeOf2.default)(MuiAppLogin)).call(this, props));

    _this.state = {
      instanceId: uuidv4()
    };
    return _this;
  }

  (0, _createClass3.default)(MuiAppLogin, [{
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
          style: (0, _extends3.default)({}, appBarStyle),
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