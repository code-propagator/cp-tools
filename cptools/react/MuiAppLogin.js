
import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'
import MuiCompLogin from 'cp-tools/libcptools/react/MuiCompLogin'
let uuidv4 = require('uuid/v4')

class MuiAppLogin extends Component {
  constructor (props) {
    super(props)
    this.state = {
      instanceId: uuidv4()
    }
  }

  handleClick () {
    this.requestLatestData()
  }

  render () {
    let appBarStyle = this.props.appBarStyle
    let title = this.props.title
    const myLoginConf = this.props.myLoginConf
    let history = this.props.history
    let nextRoute = this.props.nextRoute
    let backRoute = this.props.backRoute
    let rendererApi = this.props.rendererApi
    return (
      <div ref={this.state.instanceId} >
        <h2>MuiAppLogin:{this.state.instanceId}</h2>
        <AppBar
          style={{...appBarStyle}}
          title={
            <div>
              {title}
            </div>
          }
          showMenuIconButton={false}
        />
        <MuiCompLogin
          loginConf={myLoginConf}
          history={history}
          nextRoute={nextRoute}
          backRoute={backRoute}
          rendererApi={rendererApi} />
      </div>
    )
  }
}

export default MuiAppLogin
