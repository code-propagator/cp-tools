import React, { Component } from 'react'
import enhanceWithClickOutside from 'react-click-outside'

class ClickOutside extends Component {
  constructor (props) {
    super(props)

    this.state = {
      message: (!(this.props.messsage) ? 'CLICK OUTSIDE' : this.props.message),
      outside: false,
      clickInOrOut: this.props.clickedInOrOut
    }

    if (!this.state.clickInOrOut) {
      this.state.clickInOrOut = () => {}
    } else {
      this.state.clickInOrOut = this.state.clickInOrOut.bind(this)
    }

    this._clicked = this._clicked.bind(this)
  }

  // This method is called from 'react-click-outside' module.
  // Don't change method.
  handleClickOutside (e) {
    // OUTSIDE
    this.setState({
      outside: true
    })

    // If the component is loaded, this methid is called
    // independent of it's visibility.
    // console.log('ClickOutside handleClickOutside')

    this.state.clickInOrOut(e, true) // OUTSIDE
  }

  _clicked (e) {
    // INSIDE
    this.setState({
      outside: false
    })
    // If the component is loaded, this methid is called
    // independent of it's visibility.
    // console.log('ClickOutside _clicked')

    this.state.clickInOrOut(e, false) // INSIDE
  }

  componentDidMount () {
    this.setState({
      outside: false
    })
  }

  render () {
    let container = {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: 'white'
    }
    // container.backgroundColor = 'lightpink'
    /*
    // ### FOR DEBUG
    return (
      <div
        style={container}
        onClick={(e) => {
          this._clicked(e)
        }}>
        Message:{this.state.message}<br />
        Is outside?:{String(this.state.outside) + new Date()}<br />
        {this.props.children}
      </div>
    )
    */
    return (
      <div
        style={{...container}}
        onClick={(e) => {
          this._clicked(e)
        }}>
        {this.props.children}
      </div>
    )
  }
}

module.exports = enhanceWithClickOutside(ClickOutside)
