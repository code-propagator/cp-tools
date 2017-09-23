'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _MuiCompInputTextField = require('./MuiCompInputTextField');

var _MuiCompInputTextField2 = _interopRequireDefault(_MuiCompInputTextField);

var _MuiCompProgress = require('./MuiCompProgress');

var _MuiCompProgress2 = _interopRequireDefault(_MuiCompProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// 0.19.1

// https://material-ui-1dab0.firebaseapp.com/demos/buttons/
//　import Button from 'material-ui/Button'

// import CircularProgress from 'material-ui/CircularProgress'


var uuidv4 = require('uuid/v4');

var emitter = require('cp-tools/libcptools/node/emitter');

var loginConf = require('./MuiCompLogin.conf');

var MuiCompLogin = function (_Component) {
  _inherits(MuiCompLogin, _Component);

  function MuiCompLogin(props) {
    _classCallCheck(this, MuiCompLogin);

    // props.loginConf has custom loginConf
    var _this = _possibleConstructorReturn(this, (MuiCompLogin.__proto__ || Object.getPrototypeOf(MuiCompLogin)).call(this, props));

    _this.state = {
      received: null,
      instanceId: uuidv4(),
      refresh: 'now',
      status: '',
      inProgress: false
    };

    _this.requestLatestData = _this.requestLatestData.bind(_this);
    // this.receiver = this.receiver.bind(this)

    _this.handleClick = _this.handleClick.bind(_this);

    _this.onAuthDone = _this.onAuthDone.bind(_this);
    return _this;
  }

  _createClass(MuiCompLogin, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      console.log('MuiCompLogin will unmount');
      emitter.authEmitter.unsubscribe(this.state.instanceId);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      console.log('MuiCompLogin did mount');
      emitter.authEmitter.subscribe(this.state.instanceId, this.onAuthDone);

      _MuiCompInputTextField2.default.focusInputTextField(this.refs.username);

      // When the user come back from the main view,
      // this component is loaded again
      // We should clear the status here.
      this.setState({
        status: this.props.loginConf.status.login
      });
    }
  }, {
    key: 'requestLatestData',
    value: function requestLatestData() {
      var _this2 = this;

      var username = _MuiCompInputTextField2.default.valueOfInputTextField(this.refs.username);
      var password = _MuiCompInputTextField2.default.valueOfInputTextField(this.refs.password);
      var valid1 = this.refs.username.isValid();
      var valid2 = this.refs.password.isValid();
      console.log('USERNAME', username, valid1);
      console.log('PASSWORD', password, valid2);
      if (valid1 === true && valid2 === true) {
        // HAVING VALID STRINGS MEANS AUTH REQUEST POSSIBLE
        // Start progress, then do request.
        this.setState({
          inProgress: true,
          status: this.props.loginConf.status.inProgressStatus
        }, function () {
          _this2.props.rendererApi.callMainGet({
            type: 'doAuth',
            instanceId: _this2.state.instanceId,
            usernaem: username,
            password: password
          }, function (result) {
            // Because React with Material-UI crashed,
            // the result should be received through other method.
            console.log('callMainGet result', result);
            // this.receiver(result) ===> CRASH!!!
            // ===> It semms setState should be called appropriate timing.
            emitter.authEmitter.emit('auth-done', result);
          });
        });
      } else {
        // WRONG VALUES
      }
    }
  }, {
    key: 'onAuthDone',
    value: function onAuthDone(result) {
      var _this3 = this;

      console.log('onAuthDone', result);
      var success = result.success; // true or false
      var resultStatus = result.resultStatus;

      this.setState({
        inProgress: false,
        status: resultStatus
      }, function () {
        if (success === true) {
          // this.props.history.push(this.props.nextRoute)
          // https://github.com/ReactTraining/history#navigation
          setTimeout(function () {
            console.log('TRANSITION');
            _this3.props.history.push({
              pathname: _this3.props.nextRoute,
              search: '?dummy=anyway',
              state: { backRoute: _this3.props.backRoute }
            });
            // ===> MuiCompLogin WILL unmount.
            // ===> MuiCompNext DID mount. (NOT WILL mount)
          }, 1000);
        }
      });
    }

    /*
    receiver (result) {
      this.setState({
        received: result,
        refresh: uuidv4(),
        inProgress: false,
        status: ''
      }, () => {
        console.log('receiver', result)
      })
      // Uncaught Error: Minified React error #31
    }
    */

  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.requestLatestData();
    }
  }, {
    key: 'render',
    value: function render() {
      var myLoginConf = this.props.loginConf;

      var statusStyle = loginConf.statusStyle;
      var authStyle = loginConf.authStyle;

      /*
      {this.props.children}
      */
      /* ===> MulCompProgress
      <div tabIndex='-1' style={this.state.progressStyle}>
        <CircularProgress style={this.state.progressStyle}
          size={this.state.progressSize} thickness={this.state.progressThickness} />
      </div>
      */
      // console.log('MuiCompLogin state', this.state)
      return _react2.default.createElement(
        'div',
        { style: authStyle, ref: this.state.instanceId },
        _react2.default.createElement(
          'div',
          { style: statusStyle },
          this.state.status
        ),
        _react2.default.createElement('br', null),
        _react2.default.createElement(_MuiCompInputTextField2.default, { ref: 'username',
          conf: myLoginConf.username }),
        _react2.default.createElement('br', null),
        _react2.default.createElement(_MuiCompInputTextField2.default, { ref: 'password',
          conf: myLoginConf.password,
          type: 'password' }),
        _react2.default.createElement('br', null),
        _react2.default.createElement(_RaisedButton2.default, {
          label: myLoginConf.authButtonLabel,
          onClick: this.handleClick }),
        _react2.default.createElement('hr', null),
        this.state.received,
        _react2.default.createElement(_MuiCompProgress2.default, _extends({
          inProgress: this.state.inProgress }, this.props))
      );
    }
  }]);

  return MuiCompLogin;
}(_react.Component);

exports.default = MuiCompLogin;