'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ### use react-router-dom instead of react-router
// ### hashHistory is locally created for the electron
// import history from '../../hashHist'

// this.props.match contains router info
var Content = function (_Component) {
  (0, _inherits3.default)(Content, _Component);

  function Content(props) {
    (0, _classCallCheck3.default)(this, Content);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Content.__proto__ || (0, _getPrototypeOf2.default)(Content)).call(this, props));

    console.log('Content props', props);

    _this.decoratedContent = _this.decoratedContent.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Content, [{
    key: 'decoratedContent',
    value: function decoratedContent(id) {
      if (typeof id === 'undefined' || id < 0 || id >= this.props.contents.length) {
        return _react2.default.createElement('div', null);
      }
      // get content in the array
      var content = this.props.contents[id]; // 0, 1, 2, ...
      //
      return (0, _stringify2.default)(content);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var id = Number(this.props.match.params.contentId);
      // 0, 1, 2, ...
      // console.log('Content: find', id, 'in contents', this.props.contents)
      // external contents data
      var backlink = this.props.backlink;

      return _react2.default.createElement(
        'div',
        null,
        this.decoratedContent(id),
        _react2.default.createElement(
          'p',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: backlink },
            this.props.backtitle
          ),
          _react2.default.createElement(
            'button',
            { onClick: function onClick() {
                console.log('PUSH BACK TO', backlink);
                _this2.props.history.push(backlink); // '/routeOne'
              } },
            'Back'
          )
        )
      );
    }
  }]);
  return Content;
}(_react.Component);

exports.default = Content;