'use strict'

import {VALIDATION_TYPES} from './MuiCompInputTextField'

let defaultLoginConf = {
  status: {
    login: 'Input User ID and Password',
    inProgressStatus: 'Authenticating...'
  },
  username: {
    defaultValue: '',
    hint: 'Input User ID', // hintText
    label: 'User ID', // floatingLabelText
    stringRequired: 'Required',
    validationType: VALIDATION_TYPES.TYPE_REQUIRED
  },
  password: {
    defaultValue: '',
    hint: 'Input password', // hintText
    label: 'Password', // floatingLabelText
    stringRequired: 'Required',
    validationType: VALIDATION_TYPES.TYPE_REQUIRED
  },
  authButtonLabel: 'Login'
}

let progressStyle = {
  display: 'none',
  position: 'absolute',
  /* top: '10%', */
  left: '50%',
  bottom: '10%',
  marginTop: '-50px',
  marginLeft: '-50px'
  /* z-index: -1; ERROR. Don't do this. */
}

let progressSize = {
  size: 200,
  thickness: 16
}

let statusStyle = {
  color: '#A00',
  fontSize: '1.4rem'
}

let authStyle = {
  textAlign: 'center',
  paddingBottom: '10px',
  backgroundColor: 'white'
}

module.exports = {
  defaultLoginConf,
  progressStyle,
  progressSize,
  statusStyle,
  authStyle
}
