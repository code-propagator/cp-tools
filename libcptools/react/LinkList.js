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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
### For web app, Link shows warning when you click the same Link again.

Warning: Hash history cannot PUSH the same path;
a new entry will not be added to the history stack

### For electron, warning message is just supressed.
*/

var LinkList = function (_Component) {
  (0, _inherits3.default)(LinkList, _Component);

  function LinkList(props) {
    (0, _classCallCheck3.default)(this, LinkList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (LinkList.__proto__ || (0, _getPrototypeOf2.default)(LinkList)).call(this, props));

    _this.state = {
      links: _this.props.links // []{path:'/aaa', title:'To aaa'}, ...]
    };
    return _this;
  }

  (0, _createClass3.default)(LinkList, [{
    key: 'render',
    value: function render() {
      var list = this.state.links.map(function (elem, index) {
        return _react2.default.createElement(
          'li',
          { key: index },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              _reactRouterDom.Link,
              { to: elem.path },
              elem.title
            ),
            _react2.default.createElement('br', null)
          )
        );
      });
      /*
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/routeOne'>RouteOne</Link></li>
      <li><Link to='/routeTwo'>RouteTwo</Link></li>
      <li><Link to='/muiComp'>MuiComp</Link></li>
      */
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          'ul',
          null,
          list
        )
      );
    }
  }]);
  return LinkList;
}(_react.Component);

exports.default = LinkList;