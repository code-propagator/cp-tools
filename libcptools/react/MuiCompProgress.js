'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CircularProgress = require('material-ui/CircularProgress');

var _CircularProgress2 = _interopRequireDefault(_CircularProgress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// 0.19.1


// 1.0.0
// https://material-ui-1dab0.firebaseapp.com/demos/progress/
// import { CircularProgress } from 'material-ui/Progress'

var uuidv4 = require('uuid/v4');

var progressConf = require('./MuiCompProgress.conf');

var MuiCompProgress = function (_Component) {
  _inherits(MuiCompProgress, _Component);

  function MuiCompProgress(props) {
    _classCallCheck(this, MuiCompProgress);

    var _this = _possibleConstructorReturn(this, (MuiCompProgress.__proto__ || Object.getPrototypeOf(MuiCompProgress)).call(this, props));

    _this.state = {
      instanceId: uuidv4(),
      progressStyle: !props.progressStyle ? JSON.parse(JSON.stringify(progressConf.progressStyle)) : props.progressStyle,
      progressSize: !props.progressSize ? progressConf.progressSize.size : props.progressSize.size,
      progressThickness: !props.progressThickness ? progressConf.progressSize.thickness : props.progressSize.thickness
    };
    return _this;
  }

  _createClass(MuiCompProgress, [{
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
          style: this.state.progressStyle },
        _react2.default.createElement(_CircularProgress2.default, {
          style: this.state.progressStyle,
          size: this.state.progressSize,
          thickness: this.state.progressThickness })
      );
    }
  }]);

  return MuiCompProgress;
}(_react.Component);

exports.default = MuiCompProgress;