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

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _MuiCompInputTextField = require('./MuiCompInputTextField');

var _MuiCompInputTextField2 = _interopRequireDefault(_MuiCompInputTextField);

var _MuiCompProgress = require('./MuiCompProgress');

var _MuiCompProgress2 = _interopRequireDefault(_MuiCompProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://material-ui-1dab0.firebaseapp.com/demos/buttons/
// import Button from 'material-ui/Button'

var uuidv4 = require('uuid/v4');
// import CircularProgress from 'material-ui/CircularProgress'


// 0.19.1


var emitter = require('cp-tools/libcptools/node/emitter');

var loginConf = require('./MuiCompLogin.conf');

var MuiCompLogin = function (_Component) {
  (0, _inherits3.default)(MuiCompLogin, _Component);

  function MuiCompLogin(props) {
    (0, _classCallCheck3.default)(this, MuiCompLogin);

    // props.loginConf has custom loginConf
    var _this = (0, _possibleConstructorReturn3.default)(this, (MuiCompLogin.__proto__ || (0, _getPrototypeOf2.default)(MuiCompLogin)).call(this, props));

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

  (0, _createClass3.default)(MuiCompLogin, [{
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
        { style: (0, _extends3.default)({}, authStyle), ref: this.state.instanceId },
        _react2.default.createElement(
          'div',
          { style: (0, _extends3.default)({}, statusStyle) },
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
        _react2.default.createElement(_MuiCompProgress2.default, (0, _extends3.default)({
          inProgress: this.state.inProgress }, this.props))
      );
    }
  }]);
  return MuiCompLogin;
}(_react.Component);

exports.default = MuiCompLogin;