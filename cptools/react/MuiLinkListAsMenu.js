import React, {Component} from 'react'
// 0.19.1
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
// 1.0.0
// https://material-ui-1dab0.firebaseapp.com/demos/menus/
// import Menu, { MenuItem } from 'material-ui/Menu'

class MuiLinkListAsMenu extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeItem: ''
    }
    this.onClickItem = this.onClickItem.bind(this)
    this.clickLinkItem = this.clickLinkItem.bind(this)
  }

  clickLinkItem (index) { // 0, 1, 2, ...
    try {
      let obj = this.props.links[index]
      this.onClickItem(obj)
    } catch (err) {
    }
  }

  componentDidMount () {
    // add history change listener
    this.props.history.listen(location => {
      console.log('ROUTE CHANGED IN MENU', location)
      let pathname = location.pathname
      // ===> /muiCompTabs/1
      // sync active selected Tab item
      this.setState({activeItem: pathname})
    })

    // set activeTab
    let active = null
    let index = (!this.props.initialIndex ? 0 : this.props.initialIndex)
    if (this.props.links.length > 0) {
      // set activeItem
      active = this.props.links[index].path
    }
    // console.log('activeItem', active)
    this.setState({activeItem: active})
  }

  onClickItem (obj) {
    // console.log('onClickItem', obj)

    // this.props.history.push(path)
    this.props.history.push({
      pathname: obj.path,
      search: '?dummy=anyway',
      state: {
        path: obj.path,
        title: obj.title,
        index: obj.index
      }
    })
    // ===> '/muiCompTabs/1', 2, 3, ...

    // Bacause we are using 'value' for selected Tab,
    // activeTab should be updated to see view updated.
    this.setState({activeItem: obj.path})
  }

  render () {
    // https://stackoverflow.com/questions/41638688/material-uis-tabs-integration-with-react-router-4
    // ### Use Tabs component just like a list.
    // ### Don't insert any child object in the Tab itself.
    // ### The contents will be placed by Router!
    // {path:'/aaa', title:'To aaa'}, ...]
    // https://stackoverflow.com/questions/39543322/set-material-ui-tab-active-based-on-visited-route
    const list = this.props.links.map((elem, index) => {
      // console.log('MuiLinkListAsMenu elem', elem, 'index', index)
      return (<MenuItem
        key={index}
        primaryText={elem.title}
        value={elem.path}
        onClick={() => {
          this.onClickItem({
            path: elem.path,
            title: elem.title,
            index: index // 0, 1, 2, ...
          })
        }}
        />)
    })
    return (
      <div>
        <Menu value={this.state.activeItem}>
          {list}
        </Menu>
      </div>
    )
  }
}

export default MuiLinkListAsMenu
