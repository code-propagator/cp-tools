import React, {Component} from 'react'

import {Link} from 'react-router-dom'
// ### use react-router-dom instead of react-router
// ### hashHistory is locally created for the electron
// import history from '../../hashHist'

// this.props.match contains router info
class Content extends Component {
  constructor (props) {
    super(props)
    console.log('Content props', props)

    this.decoratedContent = this.decoratedContent.bind(this)
  }

  decoratedContent (id) {
    if (id === 'undefined' || id < 0 || id >= this.props.contents.length) {
      return (<div />)
    }
    // get content in the array
    let content = this.props.contents[id] // 0, 1, 2, ...
    //
    return JSON.stringify(content)
  }

  render () {
    const id = Number(this.props.match.params.contentId)
    // 0, 1, 2, ...
    // console.log('Content: find', id, 'in contents', this.props.contents)
    // external contents data
    const backlink = this.props.backlink

    return (
      <div>
        {this.decoratedContent(id)}
        <p>
          <Link to={backlink}>{this.props.backtitle}</Link>
          <button onClick={() => {
            console.log('PUSH BACK TO', backlink)
            this.props.history.push(backlink) // '/routeOne'
          }}>Back</button>
        </p>
      </div>
    )
  }
}

export default Content
