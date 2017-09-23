import React, {Component} from 'react'

import {Link} from 'react-router-dom'
// ### use react-router-dom instead of react-router
// ### hashHistory is locally created for the electron
// import history from '../../hashHist'
import IndentTree from './IndentTree'

// https://github.com/gre/json-beautify
var beautify = require('json-beautify')

class ContentForTree extends Component {
  render () {
    const id = Number(this.props.match.params.contentId)
    // 1, 2, 3, ...
    let treeItemsToRender = this.props.contents
    let key = id - 1 // 0, 1, 2, ...
    let foundObj = IndentTree.findTreeNodeByKey(treeItemsToRender, key, false)

    const backlink = this.props.backlink

    return (
      <div>
        id:{id}<br />
        {beautify(foundObj, null, 2, 80)}
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

export default ContentForTree
