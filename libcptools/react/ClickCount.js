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

var ClickCount = function (_Component) {
  _inherits(ClickCount, _Component);

  function ClickCount(props) {
    _classCallCheck(this, ClickCount);

    var _this = _possibleConstructorReturn(this, (ClickCount.__proto__ || Object.getPrototypeOf(ClickCount)).call(this, props));

    _this.state = {
      count: typeof _this.props.count !== 'undefined' ? _this.props.count : 0
    };
    _this.handleClickUp = _this.handleClickUp.bind(_this);
    return _this;
  }

  _createClass(ClickCount, [{
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