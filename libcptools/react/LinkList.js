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

var LinkList = function (_Component) {
  _inherits(LinkList, _Component);

  function LinkList(props) {
    _classCallCheck(this, LinkList);

    var _this = _possibleConstructorReturn(this, (LinkList.__proto__ || Object.getPrototypeOf(LinkList)).call(this, props));

    _this.state = {
      links: _this.props.links // []{path:'/aaa', title:'To aaa'}, ...]
    };
    return _this;
  }

  _createClass(LinkList, [{
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