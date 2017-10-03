'use strict'
import React from 'react'
import Checkbox from 'material-ui/Checkbox'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import DatePicker from 'material-ui/DatePicker'

let updateCellWithValue = (comp, cellInfo, value) => {
  // data in current page on the table
  const data = comp.state.data
  // update cell with value
  data[cellInfo.index][cellInfo.column.id] = value
  // set display data to update view
  comp.setState(
    { data },
    () => {
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
    }
  )
}

// Draw progress bar in a cell.
let doRenderProgress = (props, colorFunc) => {
  // console.log('progress', props)
  // value should be percent number [0, 100]
  let value = props.value
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
  return (
    <div style={{marginTop: '10px'}}>
      <div
        style={{
          width: '100%',
          height: '20px',
          backgroundColor: '#dadada',
          borderRadius: '2px'
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: '20px',
            backgroundColor: colorFunc(value),
            borderRadius: '2px',
            transition: 'all .2s ease-out'
          }}
        />
      </div>
    </div>
  )
}

let doRenderEditableText = (comp, state, fetchData, cellInfo) => {
  // Simple Text by div with contentEditable
  return (
    <div
      style={{
        marginTop: '10px',
        backgroundColor: '#fafafa'
      }}
      contentEditable
      suppressContentEditableWarning
      onBlur={e => {
        updateCellWithValue(comp, cellInfo, e.target.innerHTML)
      }}
      dangerouslySetInnerHTML={{
        __html: comp.state.data[cellInfo.index][cellInfo.column.id]
      }}
    />
  )
}

let doRenderEditableCheckbox = (comp, state, fetchData, cellInfo) => {
  // MUI Checkbox for true/false value
  const data = comp.state.data
  let checked = data[cellInfo.index][cellInfo.column.id]
  // http://www.material-ui.com/#/customization/styles
  // https://stackoverflow.com/questions/35870196/materiall-ui-refresh-indicator-center-align-horizontaly
  return (
    <div style={{position: 'relative'}}>
      <Checkbox
        label=''
        checked={checked}
        onCheck={() => {
          updateCellWithValue(comp, cellInfo, !checked)
        }}
        style={{marginTop: '50%'}}
      />
    </div>
  )
}

let doRenderDropdownMenu = (comp, state, fetchData, cellInfo, selections) => {
  let value = cellInfo.value
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
  let items = []
  selections.map((elem, index) => {
    items.push(
      <MenuItem
        key={index}
        value={elem.value}
        primaryText={elem.label}
        style={{margin: '0 auto', paddingTop: '0', paddingBottom: '0'}}
      />
    )
  })
  // For rendering without editable feature,
  // <span>{dotCircle}{dispText}</span>
  // is enough.
  //
  // For editting, MUI DropDownMenu is applied here.
  return (
    <div style={{marginTop: '-8px'}}>
      <DropDownMenu
        maxHeight={300}
        value={value}
        onChange={(event, index, value) => {
          // console.log('DropDownMenu changed', value) // 'relationship'
          updateCellWithValue(comp, cellInfo, value)
        }}
      >
        {items}
      </DropDownMenu>
    </div>
  )
}

let doRenderDatePicker = (comp, state, fetchData, cellInfo) => {
  let date = cellInfo.value
  // ### NEVER use defaultDate property of DatePicker.
  // ### Use value to display your data so that DatePicker show updated value on the cell.
  return (
    <DatePicker
      onChange={(event, newDate) => {
        updateCellWithValue(comp, cellInfo, newDate)
      }}
      autoOk
      value={date}
      mode='landscape'
      container='inline'
    />
  )
}

// For popup selection filter:
const SHOW_ALL = 'all'

let doRenderFilterOptions = (filter, onChange, options) => {
  // console.log('Filter', filter)
  // {id: 'status', value:'relationship'}
  let items = options.map((elem, index) => {
    return <option key={index} value={elem.value}>{elem.text}</option>
  })

  return (
    <select style={{width: '100%'}}
      onChange={event => onChange(event.target.value)}
      value={filter ? filter.value : SHOW_ALL}
    >
      {items}
    </select>
  )
}

module.exports = {
  doRenderProgress,
  doRenderEditableText,
  doRenderEditableCheckbox,
  doRenderDropdownMenu,
  doRenderDatePicker,
  SHOW_ALL,
  doRenderFilterOptions
}
