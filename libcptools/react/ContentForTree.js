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

var _reactRouterDom = require('react-router-dom');

var _IndentTree = require('./IndentTree');

var _IndentTree2 = _interopRequireDefault(_IndentTree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://github.com/gre/json-beautify
var beautify = require('json-beautify');
// ### use react-router-dom instead of react-router
// ### hashHistory is locally created for the electron
// import history from '../../hashHist'

var ContentForTree = function (_Component) {
  (0, _inherits3.default)(ContentForTree, _Component);

  function ContentForTree() {
    (0, _classCallCheck3.default)(this, ContentForTree);
    return (0, _possibleConstructorReturn3.default)(this, (ContentForTree.__proto__ || (0, _getPrototypeOf2.default)(ContentForTree)).apply(this, arguments));
  }

  (0, _createClass3.default)(ContentForTree, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var id = Number(this.props.match.params.contentId);
      // 1, 2, 3, ...
      var treeItemsToRender = this.props.contents;
      var key = id - 1; // 0, 1, 2, ...
      var foundObj = _IndentTree2.default.findTreeNodeByKey(treeItemsToRender, key, false);

      var backlink = this.props.backlink;

      return _react2.default.createElement(
        'div',
        null,
        'id:',
        id,
        _react2.default.createElement('br', null),
        beautify(foundObj, null, 2, 80),
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
  return ContentForTree;
}(_react.Component);

exports.default = ContentForTree;