'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClickOutside = function (_Component) {
  _inherits(ClickOutside, _Component);

  function ClickOutside(props) {
    _classCallCheck(this, ClickOutside);

    var _this = _possibleConstructorReturn(this, (ClickOutside.__proto__ || Object.getPrototypeOf(ClickOutside)).call(this, props));

    _this.state = {
      message: !_this.props.messsage ? 'CLICK OUTSIDE' : _this.props.message,
      outside: false,
      clickInOrOut: _this.props.clickedInOrOut
    };

    if (!_this.state.clickInOrOut) {
      _this.state.clickInOrOut = function () {};
    } else {
      _this.state.clickInOrOut = _this.state.clickInOrOut.bind(_this);
    }

    _this._clicked = _this._clicked.bind(_this);
    return _this;
  }

  // This method is called from 'react-click-outside' module.
  // Don't change method.


  _createClass(ClickOutside, [{
    key: 'handleClickOutside',
    value: function handleClickOutside(e) {
      // OUTSIDE
      this.setState({
        outside: true
      });

      // If the component is loaded, this methid is called
      // independent of it's visibility.
      // console.log('ClickOutside handleClickOutside')

      this.state.clickInOrOut(e, true); // OUTSIDE
    }
  }, {
    key: '_clicked',
    value: function _clicked(e) {
      // INSIDE
      this.setState({
        outside: false
      });
      // If the component is loaded, this methid is called
      // independent of it's visibility.
      // console.log('ClickOutside _clicked')

      this.state.clickInOrOut(e, false); // INSIDE
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        outside: false
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var container = {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: 'white'
        // container.backgroundColor = 'lightpink'
        /*
        // ### FOR DEBUG
        return (
          <div
            style={container}
            onClick={(e) => {
              this._clicked(e)
            }}>
            Message:{this.state.message}<br />
            Is outside?:{String(this.state.outside) + new Date()}<br />
            {this.props.children}
          </div>
        )
        */
      };return _react2.default.createElement(
        'div',
        {
          style: container,
          onClick: function onClick(e) {
            _this2._clicked(e);
          } },
        this.props.children
      );
    }
  }]);

  return ClickOutside;
}(_react.Component);

module.exports = (0, _reactClickOutside2.default)(ClickOutside);