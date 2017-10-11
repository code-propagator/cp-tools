
import React, {Component} from 'react'
// 0.19.1
import CircularProgress from 'material-ui/CircularProgress'
// 1.0.0
// https://material-ui-1dab0.firebaseapp.com/demos/progress/
// import { CircularProgress } from 'material-ui/Progress'

let uuidv4 = require('uuid/v4')

const progressConf = require('./MuiCompProgress.conf')

class MuiCompProgress extends Component {
  constructor (props) {
    super(props)
    this.state = {
      instanceId: uuidv4(),
      progressStyle: (!props.progressStyle
        ? JSON.parse(JSON.stringify(progressConf.progressStyle))
        : props.progressStyle),
      progressSize: (!props.progressSize
        ? progressConf.progressSize.size
        : props.progressSize.size),
      progressThickness: (!props.progressThickness
        ? progressConf.progressSize.thickness
        : props.progressSize.thickness)
    }
  }

  render () {
    // console.log('MuiCompProgress state', this.state)
    // read the inProgress specified by parent
    this.state.progressStyle.display = this.props.inProgress ? 'block' : 'none'
    return (
      <div
        ref={this.state.instanceId}
        tabIndex='-1'
        style={{...this.state.progressStyle}}>
        <CircularProgress
          style={{...this.state.progressStyle}}
          size={this.state.progressSize}
          thickness={this.state.progressThickness} />
      </div>
    )
  }
}

export default MuiCompProgress
