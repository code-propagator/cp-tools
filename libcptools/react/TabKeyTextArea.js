'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
  _inherits(TabKeyTextArea, _Component);

  function TabKeyTextArea(props) {
    _classCallCheck(this, TabKeyTextArea);

    var _this = _possibleConstructorReturn(this, (TabKeyTextArea.__proto__ || Object.getPrototypeOf(TabKeyTextArea)).call(this, props));

    _this.state = {
      text: !_this.props.text ? '' : _this.props.text, // begin with initial text
      instanceId: uuidv4(),
      textareaId: uuidv4()
    };

    _this.onChange = _this.onChange.bind(_this);
    _this.onKeyDown = _this.onKeyDown.bind(_this);
    return _this;
  }

  _createClass(TabKeyTextArea, [{
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
          style: this.props.style,
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