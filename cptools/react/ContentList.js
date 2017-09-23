import React, {Component} from 'react'
// import {Link} from 'react-router-dom'
import LinkList from './LinkList'

class ContentList extends Component {
  render () {
    if (!this.props) {
      return <div />
    }

    // console.log('ContentList has contents', this.props.contents)

    let matchurl = this.props.match.url
    console.log('matrch.url', matchurl)

    let links = []
    this.props.contents.map((elem, index) => {
      let path = `${matchurl}/${index}`
      // /routeOne/0, 1, 2, ... ### DON'T START WITH 1, JUST USE 0
      let title = `link to ${path}`
      if (elem.linktitle) {
        title = elem.linktitle
      }
      // {path: '/routeOne/0', title:'link to /routeOne/0'}
      links.push(
       {path: path, title: title}
      )
    })
    return <LinkList links={links} />
  }
}

export default ContentList
