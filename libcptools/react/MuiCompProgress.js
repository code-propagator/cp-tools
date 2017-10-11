'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

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

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 1.0.0
// https://material-ui-1dab0.firebaseapp.com/demos/progress/
// import { CircularProgress } from 'material-ui/Progress'

var uuidv4 = require('uuid/v4');
// 0.19.1


var progressConf = require('./MuiCompProgress.conf');

var MuiCompProgress = function (_Component) {
  (0, _inherits3.default)(MuiCompProgress, _Component);

  function MuiCompProgress(props) {
    (0, _classCallCheck3.default)(this, MuiCompProgress);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MuiCompProgress.__proto__ || (0, _getPrototypeOf2.default)(MuiCompProgress)).call(this, props));

    _this.state = {
      instanceId: uuidv4(),
      progressStyle: !props.progressStyle ? JSON.parse((0, _stringify2.default)(progressConf.progressStyle)) : props.progressStyle,
      progressSize: !props.progressSize ? progressConf.progressSize.size : props.progressSize.size,
      progressThickness: !props.progressThickness ? progressConf.progressSize.thickness : props.progressSize.thickness
    };
    return _this;
  }

  (0, _createClass3.default)(MuiCompProgress, [{
    key: 'render',
    value: function render() {
      // console.log('MuiCompProgress state', this.state)
      // read the inProgress specified by parent
      this.state.progressStyle.display = this.props.inProgress ? 'block' : 'none';
      return _react2.default.createElement(
        'div',
        {
          ref: this.state.instanceId,
          tabIndex: '-1',
          style: (0, _extends3.default)({}, this.state.progressStyle) },
        _react2.default.createElement(_CircularProgress2.default, {
          style: (0, _extends3.default)({}, this.state.progressStyle),
          size: this.state.progressSize,
          thickness: this.state.progressThickness })
      );
    }
  }]);
  return MuiCompProgress;
}(_react.Component);

exports.default = MuiCompProgress;