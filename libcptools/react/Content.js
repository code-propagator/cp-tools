'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// ### use react-router-dom instead of react-router
// ### hashHistory is locally created for the electron
// import history from '../../hashHist'

// this.props.match contains router info
var Content = function (_Component) {
  _inherits(Content, _Component);

  function Content(props) {
    _classCallCheck(this, Content);

    var _this = _possibleConstructorReturn(this, (Content.__proto__ || Object.getPrototypeOf(Content)).call(this, props));

    console.log('Content props', props);

    _this.decoratedContent = _this.decoratedContent.bind(_this);
    return _this;
  }

  _createClass(Content, [{
    key: 'decoratedContent',
    value: function decoratedContent(id) {
      if (id === 'undefined' || id < 0 || id >= this.props.contents.length) {
        return _react2.default.createElement('div', null);
      }
      // get content in the array
      var content = this.props.contents[id]; // 0, 1, 2, ...
      //
      return JSON.stringify(content);
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