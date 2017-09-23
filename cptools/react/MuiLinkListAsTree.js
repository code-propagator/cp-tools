import React, {Component} from 'react'

// http://www.material-ui.com/#/components/list
// import {List, ListItem} from 'material-ui/List'
import {List} from 'material-ui/List'

import IndentTree from './IndentTree'

class MuiLinkListAsTree extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeItem: ''
    }
    this.onClickItem = this.onClickItem.bind(this)
  }

  componentDidMount () {
    // console.log('DID MOUNT TREE', this.props.links)

    // add history change listener
    this.props.history.listen(location => {
      console.log('ROUTE CHANGED IN TREE', location)
      let pathname = location.pathname
      // ===> /muiCompTree/1
      this.setState({activeItem: pathname})
    })
  }

  clickLinkItem (index) { // 0, 1, 2, ...
    try {
      let key = index // 0, 1, 2, ...
      this.pushItemByKey(key)
      // ===> /muiCompTree/1, 2, 3, ...
    } catch (err) {
    }
  }

  findTreeNodeByKey (key, omitChildren) {
    let treeItemsToRender = this.props.links
    return IndentTree.findTreeNodeByKey(treeItemsToRender, key, omitChildren)
  }

  findTreeItemListByRef (refId) {
    // ListItem
    return this.refs.refId
  }

  pushItemByKey (key) {
    let obj = this.findTreeNodeByKey(key, true)
    console.log('found obj', obj)

    // Because we didn't setup link for route in MuiContentListWithType.js for tree,
    // route path for the current list item is generated here.
    let matchurl = this.props.match.url
    let path = `${matchurl}/${key + 1}` // 1, 2, 3, ...
    console.log('===> route path', path)
    this.props.history.push(path)

    this.props.history.push({
      pathname: path,
      search: '?dummy=anyway',
      state: {
        path: path,
        title: obj.name,
        index: key + 1 // 1, 2, 3, ....
      }
    })

    this.setState({activeItem: path})
  }

  onClickItem (key, refId) { // 0, 1, 2, ...
    console.log('MuiLinkListAsTree onClickItem', key, refId)

    this.pushItemByKey(key)
  }

  render () {
    let treeItemsToRender = this.props.links
    console.log('RENDER treeItemsToRender NOW', treeItemsToRender)
    // List with nestedItems
    // http://www.material-ui.com/#/components/list
    let render = IndentTree.renderTree(treeItemsToRender)
    console.log(render)
    var html = require('html')
    let pretty = html.prettyPrint(render, {indent_size: 2})
    console.log(pretty)

    let renderMui = IndentTree.renderMuiList(treeItemsToRender, this.onClickItem)

    return (
      <div>
        <List>
          {renderMui}
          {/* onClick works only on the text area. the arrow button doesn't work if use this. */}
          {/* primaryTogglesNestedList enables click both on the text area and arrow button */}
          {/*
          <ListItem key={0} onClick={(e) => { console.log('CLICK0', e) }} primaryText='Item One' />
          <ListItem key={1} onClick={(e) => { console.log('CLICK1', e) }} primaryText='Item Two' />
          <ListItem key={2}
            open={this.state.open}
            onClick={(e) => {
              console.log('CLICK2', e)
              this.setState({open: !this.state.open})
            }}
            primaryText='GROUP ONE'
            nestedItems={[
              <ListItem key={3} onClick={(e) => { console.log('CLICK3', e) }} primaryText='Item One' />,
              <ListItem key={4} onClick={(e) => { console.log('CLICK4', e) }} primaryText='Item Two' />
            ]} />
          <ListItem key={5} onClick={(e) => { console.log('CLICK5', e) }} primaryText='GROUP TWO'
            initiallyOpen
            primaryTogglesNestedList
            nestedItems={[
              <ListItem key={6} onClick={(e) => { console.log('CLICK6', e) }} primaryText='Item One' />,
              <ListItem key={7} onClick={(e) => { console.log('CLICK7', e) }} primaryText='Item Two' />
            ]}
          />
          */}
        </List>
      </div>
    )
  }
}

export default MuiLinkListAsTree
