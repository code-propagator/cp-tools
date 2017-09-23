import React, {Component} from 'react'
let uuidv4 = require('uuid/v4')

const KEYCODE_TAB = 9
const TAB = '\t'

/*
const textareaStyle = {
  width: '100%',
  height: '500px',
  border: '1px dashed #DADADA',
  outline: 'none',
  padding: '10px',
  boxSizing: 'border-box',
  resize: 'none',
  fontSize: '0.8em'
}
*/

class TabKeyTextArea extends Component {
  constructor (props) {
    super(props)

    this.state = {
      text: (!this.props.text ? '' : this.props.text), // begin with initial text
      instanceId: uuidv4(),
      textareaId: uuidv4()
    }

    this.onChange = this.onChange.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  onChange (event) {
    this.setState({
      text: event.target.value
    }, () => {
      this.props.onChangeCallback(this.state.text)
    })
  }

  // https://stackoverflow.com/questions/38385936/change-the-cursor-position-in-a-textarea-with-react
  // https://jsfiddle.net/2wAzx/13/
  onKeyDown (event) {
    if (event.keyCode === KEYCODE_TAB) {
      event.preventDefault()
      let val = this.state.text
      let start = event.target.selectionStart
      let end = event.target.selectionEnd
      this.setState({
        'text': val.substring(0, start) + TAB + val.substring(end)
      }, () => {
        let ta = this.refs[this.state.textareaId]
        ta.selectionStart = ta.selectionEnd = start + 1
      })
      // keep focus on the textarea
      return false
    }
  }

  render () {
    return (
      <div ref={this.state.instanceId} >
        <textarea ref={this.state.textareaId}
          style={this.props.style}
          value={this.state.text}
          onKeyDown={this.onKeyDown}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

export default TabKeyTextArea
