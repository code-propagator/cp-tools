
import React, {Component} from 'react'

// 0.19.1
import RaisedButton from 'material-ui/RaisedButton'
// https://material-ui-1dab0.firebaseapp.com/demos/buttons/
// import Button from 'material-ui/Button'

import MuiCompInputTextField from './MuiCompInputTextField'
// import CircularProgress from 'material-ui/CircularProgress'
import MuiCompProgress from './MuiCompProgress'

let uuidv4 = require('uuid/v4')

const emitter = require('cp-tools/libcptools/node/emitter')

const loginConf = require('./MuiCompLogin.conf')

class MuiCompLogin extends Component {
  constructor (props) {
    super(props)

    // props.loginConf has custom loginConf
    this.state = {
      received: null,
      instanceId: uuidv4(),
      refresh: 'now',
      status: '',
      inProgress: false
    }

    this.requestLatestData = this.requestLatestData.bind(this)
    // this.receiver = this.receiver.bind(this)

    this.handleClick = this.handleClick.bind(this)

    this.onAuthDone = this.onAuthDone.bind(this)
  }

  componentWillUnmount () {
    console.log('MuiCompLogin will unmount')
    emitter.authEmitter.unsubscribe(this.state.instanceId)
  }

  componentDidMount () {
    console.log('MuiCompLogin did mount')
    emitter.authEmitter.subscribe(this.state.instanceId, this.onAuthDone)

    MuiCompInputTextField.focusInputTextField(this.refs.username)

    // When the user come back from the main view,
    // this component is loaded again
    // We should clear the status here.
    this.setState({
      status: this.props.loginConf.status.login
    })
  }

  requestLatestData () {
    var username = MuiCompInputTextField.valueOfInputTextField(this.refs.username)
    var password = MuiCompInputTextField.valueOfInputTextField(this.refs.password)
    let valid1 = this.refs.username.isValid()
    let valid2 = this.refs.password.isValid()
    console.log('USERNAME', username, valid1)
    console.log('PASSWORD', password, valid2)
    if (valid1 === true && valid2 === true) {
      // HAVING VALID STRINGS MEANS AUTH REQUEST POSSIBLE
      // Start progress, then do request.
      this.setState({
        inProgress: true,
        status: this.props.loginConf.status.inProgressStatus
      }, () => {
        this.props.rendererApi.callMainGet({
          type: 'doAuth',
          instanceId: this.state.instanceId,
          usernaem: username,
          password: password
        }, (result) => {
          // Because React with Material-UI crashed,
          // the result should be received through other method.
          console.log('callMainGet result', result)
          // this.receiver(result) ===> CRASH!!!
          // ===> It semms setState should be called appropriate timing.
          emitter.authEmitter.emit('auth-done', result)
        })
      })
    } else {
      // WRONG VALUES
    }
  }

  onAuthDone (result) {
    console.log('onAuthDone', result)
    let success = result.success // true or false
    let resultStatus = result.resultStatus

    this.setState({
      inProgress: false,
      status: resultStatus
    }, () => {
      if (success === true) {
        // this.props.history.push(this.props.nextRoute)
        // https://github.com/ReactTraining/history#navigation
        setTimeout(() => {
          console.log('TRANSITION')
          this.props.history.push({
            pathname: this.props.nextRoute,
            search: '?dummy=anyway',
            state: {backRoute: this.props.backRoute}
          })
          // ===> MuiCompLogin WILL unmount.
          // ===> MuiCompNext DID mount. (NOT WILL mount)
        }, 1000)
      }
    })
  }

  /*
  receiver (result) {
    this.setState({
      received: result,
      refresh: uuidv4(),
      inProgress: false,
      status: ''
    }, () => {
      console.log('receiver', result)
    })
    // Uncaught Error: Minified React error #31
  }
  */

  handleClick () {
    this.requestLatestData()
  }

  render () {
    let myLoginConf = this.props.loginConf

    let statusStyle = loginConf.statusStyle
    let authStyle = loginConf.authStyle

    /*
    {this.props.children}
    */
    /* ===> MulCompProgress
    <div tabIndex='-1' style={this.state.progressStyle}>
      <CircularProgress style={this.state.progressStyle}
        size={this.state.progressSize} thickness={this.state.progressThickness} />
    </div>
    */
    // console.log('MuiCompLogin state', this.state)
    return (
      <div style={authStyle} ref={this.state.instanceId} >
        <div style={statusStyle}>{this.state.status}</div><br />
        <MuiCompInputTextField ref='username'
          conf={myLoginConf.username} /><br />
        <MuiCompInputTextField ref='password'
          conf={myLoginConf.password}
          type='password' /><br />
        <RaisedButton
          label={myLoginConf.authButtonLabel}
          onClick={this.handleClick} />
        <hr />
        {this.state.received}
        <MuiCompProgress
          inProgress={this.state.inProgress} {...this.props} />
      </div>
    )
  }
}

export default MuiCompLogin
