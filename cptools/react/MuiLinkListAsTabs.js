import React, {Component} from 'react'
import {Tabs, Tab} from 'material-ui/Tabs'

class MuiLinkListAsTabs extends Component {
  constructor (props) {
    super(props)

    this.state = {
      activeTab: ''
    }

    this.onClickTab = this.onClickTab.bind(this)
  }

  componentDidMount () {
    this.props.history.listen(location => {
      // console.log('ROUTE CHANGED', location)
      let pathname = location.pathname
      // ===> /muiCompTabs/1
      // sync active selected Tab item
      this.setState({activeTab: pathname})
    })

    // set activeTab
    let active = null
    let index = (!this.props.initialIndex ? 0 : this.props.initialIndex)
    if (this.props.links.length > 0) {
      // set activeTab
      active = this.props.links[index].path
    }
    // console.log('activeTab', active)
    this.setState({activeTab: active})
    this.clickLinkItem = this.clickLinkItem.bind(this)
  }

  clickLinkItem (index) { // 0, 1, 2, ...
    try {
      let obj = this.props.links[index]
      this.onClickItem(obj)
    } catch (err) {
    }
  }

  onClickTab (obj) {
    // console.log('onClickTab', obj)

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
    this.setState({activeTab: obj.path})
  }

  render () {
    // https://stackoverflow.com/questions/41638688/material-uis-tabs-integration-with-react-router-4
    // ### Use Tabs component just like a list.
    // ### Don't insert any child object in the Tab itself.
    // ### The contents will be placed by Router!
    // {path:'/aaa', title:'To aaa'}, ...]
    // https://stackoverflow.com/questions/39543322/set-material-ui-tab-active-based-on-visited-route
    const list = this.props.links.map((elem, index) => {
      // console.log('MuiLinkListAsTabs elem', elem, 'index', index)
      return (<Tab
        label={elem.title}
        value={elem.path}
        onActive={() => {
          this.onClickTab({
            path: elem.path,
            title: elem.title,
            index: index // 0, 1, 2, ...
          })
        }}
        />)
    })
    return (
      <div>
        <Tabs value={this.state.activeTab}>
          {list}
        </Tabs>
      </div>
    )
  }
}

export default MuiLinkListAsTabs
