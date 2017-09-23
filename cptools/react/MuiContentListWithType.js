import React, {Component} from 'react'
// import {Link} from 'react-router-dom'
import MuiLinkListAsTabs from './MuiLinkListAsTabs'
import MuiLinkListAsMenu from './MuiLinkListAsMenu'
import MuiLinkListAsTree from './MuiLinkListAsTree'

export const LINKLIST_TYPES = {
  TYPE_TABS: 'MuiLinkListAsTabs',
  TYPE_MENU: 'MuiLinkListAsPopover',
  TYPE_TREE: 'MuiLinkListAsTree'
}

class MuiContentListWithType extends Component {
  constructor (props) {
    super(props)

    this.setupLinksForFlatList = this.setupLinksForFlatList.bind(this)
    this.setupLinksForTree = this.setupLinksForTree.bind(this)
  }

  // used from outside
  clickLinkItem (index) {
    if (!this.props.contents) {
      return
    }
    if (!this.props.contents.length) {
      return
    }
    if (index < 0 && index >= this.props.contents.length) {
      return
    }
    // for convenience, send message to change the route to link list (Tabs, Menu, ...)
    this.refs.linklist.clickLinkItem(index)
  }

  setupLinksForFlatList () {
    let matchurl = this.props.match.url
    // console.log('matrch.url', matchurl)

    let links = []
    this.props.contents.map((elem, index) => {
      // Set up route for the elem
      let path = `${matchurl}/${index}`
      // /routeOne/0, 1, 2, ... ### DON'T START WITH 1, JUST USE 0
      let title = `link to ${path}` // default title
      if (elem.linktitle) {
        title = elem.linktitle
      }
      // {path: '/routeOne/1', title:'link to /routeOne/1'}
      links.push({
        path: path, // /routeOne/0
        title: title // link to AAA
      })
    })
    return links
  }

  setupLinksForTree () {
    let links = this.props.contents
    // ### for Tree, the contents contains tree items
    // ### just forward tree data
    return links
  }

  render () {
    if (!this.props) {
      return <div />
    }
    // console.log('ContentList has contents', this.props.contents)
    let type = this.props.type
    if (type === LINKLIST_TYPES.TYPE_TABS) {
      return <MuiLinkListAsTabs ref='linklist' links={this.setupLinksForFlatList()} history={this.props.history} {...this.props} />
    } else if (type === LINKLIST_TYPES.TYPE_MENU) {
      return <MuiLinkListAsMenu ref='linklist' links={this.setupLinksForFlatList()} history={this.props.history} {...this.props} />
    } else if (type === LINKLIST_TYPES.TYPE_TREE) {
      return <MuiLinkListAsTree ref='linklist' links={this.setupLinksForTree()} history={this.props.history} {...this.props} />
    }
  }
}

export default MuiContentListWithType
