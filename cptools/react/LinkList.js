import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class LinkList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      links: this.props.links // []{path:'/aaa', title:'To aaa'}, ...]
    }
  }

  render () {
    const list = this.state.links.map((elem, index) => (
      <li key={index}>
        <div>
          <Link to={elem.path}>{elem.title}</Link><br />
        </div>
      </li>
    ))
    /*
    <li><Link to='/'>Home</Link></li>
    <li><Link to='/routeOne'>RouteOne</Link></li>
    <li><Link to='/routeTwo'>RouteTwo</Link></li>
    <li><Link to='/muiComp'>MuiComp</Link></li>
    */
    return (
      <div>
        <ul>
          {list}
        </ul>
      </div>
    )
  }
}

export default LinkList
