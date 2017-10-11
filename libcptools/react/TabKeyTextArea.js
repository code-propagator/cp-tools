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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var uuidv4 = require('uuid/v4');

var KEYCODE_TAB = 9;
var TAB = '\t';

/*
const textareaStyle = {
  width: '100%',
  height: '500px',
  border: '1px dashed #DADADA',
  outline: 'none',
  padding: '10px',
  boxSizing: 'border-box',
  resize: 'none',
  fontSize: '0.8em'
}
*/

var TabKeyTextArea = function (_Component) {
  (0, _inherits3.default)(TabKeyTextArea, _Component);

  function TabKeyTextArea(props) {
    (0, _classCallCheck3.default)(this, TabKeyTextArea);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TabKeyTextArea.__proto__ || (0, _getPrototypeOf2.default)(TabKeyTextArea)).call(this, props));

    _this.state = {
      text: !_this.props.text ? '' : _this.props.text, // begin with initial text
      instanceId: uuidv4(),
      textareaId: uuidv4()
    };

    _this.onChange = _this.onChange.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(TabKeyTextArea, [{
    key: 'onChange',
    value: function onChange(event) {
      var _this2 = this;

      this.setState({
        text: event.target.value
      }, function () {
        _this2.props.onChangeCallback(_this2.state.text);
      });
    }

    // https://stackoverflow.com/questions/38385936/change-the-cursor-position-in-a-textarea-with-react
    // https://jsfiddle.net/2wAzx/13/

  }, {
    key: 'onKeyDown',
    value: function onKeyDown(event) {
      var _this3 = this;

      if (event.keyCode === KEYCODE_TAB) {
        event.preventDefault();
        var val = this.state.text;
        var start = event.target.selectionStart;
        var end = event.target.selectionEnd;
        this.setState({
          'text': val.substring(0, start) + TAB + val.substring(end)
        }, function () {
          var ta = _this3.refs[_this3.state.textareaId];
          ta.selectionStart = ta.selectionEnd = start + 1;
        });
        // keep focus on the textarea
        return false;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { ref: this.state.instanceId },
        _react2.default.createElement('textarea', { ref: this.state.textareaId,
          style: (0, _extends3.default)({}, this.props.style),
          value: this.state.text,
          onKeyDown: this.onKeyDown,
          onChange: this.onChange
        })
      );
    }
  }]);
  return TabKeyTextArea;
}(_react.Component);

exports.default = TabKeyTextArea;