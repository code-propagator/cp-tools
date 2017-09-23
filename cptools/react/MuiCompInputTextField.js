import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import TextField from 'material-ui/TextField'

let uuidv4 = require('uuid/v4')

export const VALIDATION_TYPES = {
  TYPE_REQUIRED: 'required',
  STRING_REQUIRED: 'Required'
}

export default class MuiCompInputTextField extends Component {
  constructor (props) {
    super(props)

    this.state = {
      instanceId: uuidv4(),
      errorText: '', // begin with no error
      value: props.conf.defaultValue
    }
    this.onChange = this.onChange.bind(this)
    this.checkForRequired = this.checkForRequired.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
    this.isValid = this.isValid.bind(this)
  }

  checkForRequired (value) {
    // console.log('CHECK REQUIREMET FOR value', value)
    let checked = VALIDATION_TYPES.STRING_REQUIRED
    if (String(value).length > 0) {
      // Now we have valid value for this requirement.
      checked = '' // no error
    } else {
      if (!this.props.conf.stringRequired) {
        checked = VALIDATION_TYPES.STRING_REQUIRED
      } else {
        checked = this.props.conf.stringRequired
      }
    }
    this.setState({
      errorText: checked,
      value: value
    })
  }

  handleOnChange (value) {
    if (
      this.props.conf !== 'undefined' &&
      this.props.conf.validationType !== 'undefined' &&
      this.props.conf.validationType === VALIDATION_TYPES.TYPE_REQUIRED
    ) {
      this.checkForRequired(value)
    } else {
      this.setState({
        errorText: '',
        value: value
      })
    }
  }

  onChange (event, newValue) {
    // console.log('onChange', newValue)
    // http://www.material-ui.com/#/components/text-field
    this.handleOnChange(newValue)
  }

  componentDidMount () {
    // Excecute input check for the first time
    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleOnChange(this.state.value)
  }

  render () {
    // console.log('MuiCompInputTextField state', this.state)
    // console.log('MuiCompInputTextField props', this.props)

    return (
      <TextField ref={this.state.instanceId}
        defaultValue={this.props.conf.defaultValue}
        hintText={this.props.conf.hint}
        floatingLabelText={this.props.conf.label}
        type={this.props.type}
        errorText={this.state.errorText}
        onChange={this.onChange.bind(this)}
      />
    )
  }

  isValid () {
    return this.state.errorText === ''
  }

  // focus the input
  static focusInputTextField (ref) {
    // MuiCompInputTextField is obtained as ReactDOM
    var arr = ReactDOM.findDOMNode(ref).childNodes
    if (!arr) {
      return ''
    }

    arr.forEach((elem) => {
      // console.log(elem.nodeName)
      if (elem.nodeName === 'INPUT') {
        // console.log('FOCUS INPUT', elem.value)
        elem.focus()
      }
    })
  }

  // reads directry from the TextField DOM
  static valueOfInputTextField (ref) {
    var arr = ReactDOM.findDOMNode(ref).childNodes
    if (!arr) {
      return ''
    }

    var found = ''

    arr.forEach((elem) => {
      // console.log(elem.nodeName)
      if (elem.nodeName === 'INPUT') {
        // console.log('INPUT VALUE', elem.value)
        found = elem.value
      }
    })

    return found
  }
}
