'use strict';

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

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _RaisedButton = require('material-ui/RaisedButton');

var _RaisedButton2 = _interopRequireDefault(_RaisedButton);

var _reactFlexboxGrid = require('react-flexbox-grid');

var _reactVariableHeightInfiniteScroller = require('react-variable-height-infinite-scroller');

var _reactVariableHeightInfiniteScroller2 = _interopRequireDefault(_reactVariableHeightInfiniteScroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AVERAGE_ELEMENT_HEIGHT = 56;

// 'react-infinite-grid' --> ERROR
// 'react-list' --> ERROR
// https://github.com/tnrich/react-variable-height-infinite-scroller

var CONTAINER_HEIGHT = AVERAGE_ELEMENT_HEIGHT * 5;

var MuiScrollList = function (_Component) {
  (0, _inherits3.default)(MuiScrollList, _Component);

  function MuiScrollList(props) {
    (0, _classCallCheck3.default)(this, MuiScrollList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MuiScrollList.__proto__ || (0, _getPrototypeOf2.default)(MuiScrollList)).call(this, props));

    _this.renderRow = _this.renderRow.bind(_this);
    // next line number to display
    var jump = { row: 0 };

    _this.state = {
      rowToJumpTo: null,
      newRowToJumpTo: jump,
      averageElementHeight: typeof _this.props.averageElementHeight === 'undefined' ? AVERAGE_ELEMENT_HEIGHT : _this.props.averageElementHeight,
      containerHeight: typeof _this.props.containerHeight === 'undefined' ? CONTAINER_HEIGHT : _this.props.containerHeight,
      fetchData: _this.props.fetchData, // function to fetch data
      renderRow: _this.props.renderRow, // function to reander row
      showRefreshButton: _this.props.showRefreshButton,
      onClickRow: _this.props.onClickRow
    };

    _this.jumpToTop = _this.jumpToTop.bind(_this);
    _this.jumpToEnd = _this.jumpToEnd.bind(_this);

    _this.refreshData = _this.refreshData.bind(_this);

    _this.onClickRow = _this.onClickRow.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(MuiScrollList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      // call function to fetch new data
      // this.state.fetchData()
    }
  }, {
    key: 'jumpToTop',
    value: function jumpToTop() {
      if (!this.props.dataArr) return;
      if (!this.props.dataArr.length) return;
      var len = this.props.dataArr.length;
      if (len < 1) return;
      console.log('jumpToTop');
      // line number to jump to
      var newjump = { row: 0
        // data index for jump to
      };var newrow = { row: 0 };

      this.setState({
        rowToJumpTo: newjump,
        newRowToJumpTo: newrow
      });
    }
  }, {
    key: 'jumpToEnd',
    value: function jumpToEnd() {
      if (!this.props.dataArr) return;
      if (!this.props.dataArr.length) return;
      var len = this.props.dataArr.length;
      if (len < 1) return;

      console.log('HEIGHT', this.state.averageElementHeight, len, this.state.averageElementHeight * len, this.state.containerHeight);

      if (this.state.averageElementHeight * len < this.state.containerHeight) {
        console.log('SMALL NUMVER OF ITEMS');
        return;
      }

      var end = len - 1;
      console.log('jumpToEnd', end);
      // line number to jump to
      var newjump = { row: end
        // data index to jump to
      };var newrow = { row: end };

      this.setState({
        rowToJumpTo: newjump,
        newRowToJumpTo: newrow
      });
    }
  }, {
    key: 'refreshData',
    value: function refreshData() {
      this.state.fetchData();
      this.jumpToTop();
    }
  }, {
    key: 'render',
    value: function render() {
      var count = 0;
      if (this.props.dataArr === undefined) {
        count = 0;
      } else {
        count = this.props.dataArr.length;
      }

      var averageElementHeight = typeof this.state.averageElementHeight === 'undefined' ? AVERAGE_ELEMENT_HEIGHT : this.state.averageElementHeight;

      var containerHeight = typeof this.state.containerHeight === 'undefined' ? CONTAINER_HEIGHT : this.state.containerHeight;

      if (typeof this.props.hideHeader !== 'undefined' && this.props.hideHeader === true) {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('div', { style: { width: '100%', height: '4px' } }),
          _react2.default.createElement(
            'div',
            { overflow: 'scroll' },
            count > 0 ? _react2.default.createElement(_reactVariableHeightInfiniteScroller2.default, {
              averageElementHeight: averageElementHeight // this is a guess you make!
              , containerHeight: containerHeight,
              rowToJumpTo: this.state.rowToJumpTo // (optional) set this if you want to start/jump to a a particular row. Must be passed as a new object each time to allow for difference checking
              , renderRow: this.renderRow // function to render a row
              , totalNumberOfRows: count // an array of data for your rows
            }) : _react2.default.createElement('div', null)
          )
        );
      } else {
        var COUNT = '件数';
        var HEAD = '先頭';
        var TAIL = '末尾';
        var REFRESH = '最新';

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _reactFlexboxGrid.Grid,
            { fluid: true },
            _react2.default.createElement(
              _reactFlexboxGrid.Row,
              { middle: 'xs' },
              _react2.default.createElement(
                _reactFlexboxGrid.Col,
                { xs: true },
                COUNT,
                ':',
                count
              ),
              _react2.default.createElement(
                _reactFlexboxGrid.Col,
                { xs: true },
                _react2.default.createElement(_RaisedButton2.default, { label: HEAD, onClick: this.jumpToTop }),
                _react2.default.createElement(_RaisedButton2.default, { label: TAIL, onClick: this.jumpToEnd }),
                typeof this.state.showRefreshButton !== 'undefined' && this.state.showRefreshButton === true ? _react2.default.createElement(_RaisedButton2.default, { label: REFRESH, onClick: this.refreshData }) : _react2.default.createElement('div', null)
              )
            )
          ),
          _react2.default.createElement('div', { style: { width: '100%', height: '4px' } }),
          _react2.default.createElement(
            'div',
            { overflow: 'scroll' },
            count > 0 ? _react2.default.createElement(_reactVariableHeightInfiniteScroller2.default, {
              averageElementHeight: averageElementHeight // this is a guess you make!
              , containerHeight: containerHeight,
              rowToJumpTo: this.state.rowToJumpTo // (optional) set this if you want to start/jump to a a particular row. Must be passed as a new object each time to allow for difference checking
              , renderRow: this.renderRow // function to render a row
              , totalNumberOfRows: count // an array of data for your rows
            }) : _react2.default.createElement('div', null)
          )
        );
      }
    }
  }, {
    key: 'renderRow',
    value: function renderRow(rowNumber) {
      var _this2 = this;

      var heightOfRow = this.props.dataArr[rowNumber].height;
      /*
      var disp = "";
      var obj = this.props.dataArr[rowNumber];
      if ((!!obj) && (obj != null)) {
          if ((!!(obj.info.name)) && (obj.info.name != null)) {
              disp = obj.info.name;
          }
      }
       let color = rowNumber % 4 === 0 ? 'red' : 'blue';
      */
      var disp = this.state.renderRow(rowNumber);
      /*
      <div>
          [{rowNumber}](H:{heightOfRow}):{disp}<br/>
          <div style={{
              width: "200px",
              height: "7px",
              background: color
          }}></div>
      </div>
      */

      return _react2.default.createElement(
        'div',
        { key: rowNumber,
          style: {
            height: heightOfRow,
            margin: '1px'
          } },
        _react2.default.createElement(
          _Paper2.default,
          { className: {
              margin: 20,
              textAlign: 'left',
              wordWrap: 'break-word',
              display: 'inline-block'
            }, zDepth: 1 },
          _react2.default.createElement(
            _MenuItem2.default,
            { onClick: function onClick(e) {
                console.log('item click', e);
                _this2.onClickRow(e);
              } },
            disp
          )
        )
      );
    }
  }, {
    key: 'onClickRow',
    value: function onClickRow(evt) {
      this.state.onClickRow(evt);
    }
  }]);
  return MuiScrollList;
}(_react.Component);

module.exports = MuiScrollList;