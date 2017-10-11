'use strict';

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

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClickOutside = function (_Component) {
  (0, _inherits3.default)(ClickOutside, _Component);

  function ClickOutside(props) {
    (0, _classCallCheck3.default)(this, ClickOutside);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ClickOutside.__proto__ || (0, _getPrototypeOf2.default)(ClickOutside)).call(this, props));

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


  (0, _createClass3.default)(ClickOutside, [{
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
          style: (0, _extends3.default)({}, container),
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