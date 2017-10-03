'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _DropDownMenu = require('material-ui/DropDownMenu');

var _DropDownMenu2 = _interopRequireDefault(_DropDownMenu);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _DatePicker = require('material-ui/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateCellWithValue = function updateCellWithValue(comp, cellInfo, value) {
  // data in current page on the table
  var data = comp.state.data;
  // update cell with value
  data[cellInfo.index][cellInfo.column.id] = value;
  // set display data to update view
  comp.setState({ data: data }, function () {
    // ### AFTER 'did state changed'
    // ### ===> You are responsible to store any changes in data to the data source
    // before a user changes page, filter data, or sort data.
    // The data temporally holds display data on the current page.
    // When fetchData is executed, the data will vary.
    //
    // Also, thinking about some hooks of component (in comp) would be effective.
    // https://stackoverflow.com/questions/26402534/how-to-listen-state-changes-in-react-js
    // componentWillUpdate(object nextProps, object nextState)
    // componentDidUpdate(object prevProps, object prevState)
  });
};

// Draw progress bar in a cell.
var doRenderProgress = function doRenderProgress(props, colorFunc) {
  // console.log('progress', props)
  // value should be percent number [0, 100]
  var value = props.value;
  /*
  let row = props.row
  let index = props.index
  let viewIndex = props.viewIndex
  let original = props.original
  console.log('value', value)
  console.log('row', row) // visible columns
  console.log('index', index) // index in source data
  console.log('viewIndex', viewIndex) // visible (sorted) index in display
  console.log('original', original) // source data (contains all fields)
  */
  // draw background with gray
  // paint value rect with animation
  return _react2.default.createElement(
    'div',
    { style: { marginTop: '10px' } },
    _react2.default.createElement(
      'div',
      {
        style: {
          width: '100%',
          height: '20px',
          backgroundColor: '#dadada',
          borderRadius: '2px'
        }
      },
      _react2.default.createElement('div', {
        style: {
          width: value + '%',
          height: '20px',
          backgroundColor: colorFunc(value),
          borderRadius: '2px',
          transition: 'all .2s ease-out'
        }
      })
    )
  );
};

var doRenderEditableText = function doRenderEditableText(comp, state, fetchData, cellInfo) {
  // Simple Text by div with contentEditable
  return _react2.default.createElement('div', {
    style: {
      marginTop: '10px',
      backgroundColor: '#fafafa'
    },
    contentEditable: true,
    suppressContentEditableWarning: true,
    onBlur: function onBlur(e) {
      updateCellWithValue(comp, cellInfo, e.target.innerHTML);
    },
    dangerouslySetInnerHTML: {
      __html: comp.state.data[cellInfo.index][cellInfo.column.id]
    }
  });
};

var doRenderEditableCheckbox = function doRenderEditableCheckbox(comp, state, fetchData, cellInfo) {
  // MUI Checkbox for true/false value
  var data = comp.state.data;
  var checked = data[cellInfo.index][cellInfo.column.id];
  // http://www.material-ui.com/#/customization/styles
  // https://stackoverflow.com/questions/35870196/materiall-ui-refresh-indicator-center-align-horizontaly
  return _react2.default.createElement(
    'div',
    { style: { position: 'relative' } },
    _react2.default.createElement(_Checkbox2.default, {
      label: '',
      checked: checked,
      onCheck: function onCheck() {
        updateCellWithValue(comp, cellInfo, !checked);
      },
      style: { marginTop: '50%' }
    })
  );
};

var doRenderDropdownMenu = function doRenderDropdownMenu(comp, state, fetchData, cellInfo, selections) {
  var value = cellInfo.value;
  // &#x25cf
  // Unicode Character 'BLACK CIRCLE' (U+25CF)
  // http://www.fileformat.info/info/unicode/char/25CF/index.htm

  /*
  let decideColor = (v) => {
    return v === 'relationship' ? '#ff2e00'
      : v === 'complicated' ? '#ffbf00'
      : '#57d500'
  }
  let decideText = (v) => {
    return v === 'relationship' ? 'In a relationship'
      : v === 'complicated' ? `It's complicated`
      : 'Single'
  }
  let blackCircle = '\u25CF'
  let colorDot = (c) => {
    return (
      <span style={{
        color: {c},
        transition: 'all .3s ease'
      }}>
        {blackCircle}
      </span>
    )
  }
   let color = decideColor(value)
  let dispText = decideText(value)
  let dotCircle = colorDot(color)
  // console.log(dotCircle, dispText)
  */
  var items = [];
  selections.map(function (elem, index) {
    items.push(_react2.default.createElement(_MenuItem2.default, {
      key: index,
      value: elem.value,
      primaryText: elem.label,
      style: { margin: '0 auto', paddingTop: '0', paddingBottom: '0' }
    }));
  });
  // For rendering without editable feature,
  // <span>{dotCircle}{dispText}</span>
  // is enough.
  //
  // For editting, MUI DropDownMenu is applied here.
  return _react2.default.createElement(
    'div',
    { style: { marginTop: '-8px' } },
    _react2.default.createElement(
      _DropDownMenu2.default,
      {
        maxHeight: 300,
        value: value,
        onChange: function onChange(event, index, value) {
          // console.log('DropDownMenu changed', value) // 'relationship'
          updateCellWithValue(comp, cellInfo, value);
        }
      },
      items
    )
  );
};

var doRenderDatePicker = function doRenderDatePicker(comp, state, fetchData, cellInfo) {
  var date = cellInfo.value;
  // ### NEVER use defaultDate property of DatePicker.
  // ### Use value to display your data so that DatePicker show updated value on the cell.
  return _react2.default.createElement(_DatePicker2.default, {
    onChange: function onChange(event, newDate) {
      updateCellWithValue(comp, cellInfo, newDate);
    },
    autoOk: true,
    value: date,
    mode: 'landscape',
    container: 'inline'
  });
};

// For popup selection filter:
var SHOW_ALL = 'all';

var doRenderFilterOptions = function doRenderFilterOptions(filter, _onChange, options) {
  // console.log('Filter', filter)
  // {id: 'status', value:'relationship'}
  var items = options.map(function (elem, index) {
    return _react2.default.createElement(
      'option',
      { key: index, value: elem.value },
      elem.text
    );
  });

  return _react2.default.createElement(
    'select',
    { style: { width: '100%' },
      onChange: function onChange(event) {
        return _onChange(event.target.value);
      },
      value: filter ? filter.value : SHOW_ALL
    },
    items
  );
};

module.exports = {
  doRenderProgress: doRenderProgress,
  doRenderEditableText: doRenderEditableText,
  doRenderEditableCheckbox: doRenderEditableCheckbox,
  doRenderDropdownMenu: doRenderDropdownMenu,
  doRenderDatePicker: doRenderDatePicker,
  SHOW_ALL: SHOW_ALL,
  doRenderFilterOptions: doRenderFilterOptions
};