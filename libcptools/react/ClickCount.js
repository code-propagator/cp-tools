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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClickCount = function (_Component) {
  (0, _inherits3.default)(ClickCount, _Component);

  function ClickCount(props) {
    (0, _classCallCheck3.default)(this, ClickCount);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ClickCount.__proto__ || (0, _getPrototypeOf2.default)(ClickCount)).call(this, props));

    _this.state = {
      count: typeof _this.props.count !== 'undefined' ? _this.props.count : 0
    };
    _this.handleClickUp = _this.handleClickUp.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(ClickCount, [{
    key: 'handleClickUp',
    value: function handleClickUp() {
      var val = this.state.count + 1;

      this.setState({
        count: val
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        'Count Up:',
        _react2.default.createElement(
          'span',
          null,
          this.state.count
        ),
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'button',
            { onClick: this.handleClickUp },
            'UP'
          )
        )
      );
    }
  }]);
  return ClickCount;
}(_react.Component);

exports.default = ClickCount;