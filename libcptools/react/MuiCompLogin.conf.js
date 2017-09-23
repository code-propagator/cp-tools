'use strict';

var _MuiCompInputTextField = require('./MuiCompInputTextField');

var defaultLoginConf = {
  status: {
    login: 'Input User ID and Password',
    inProgressStatus: 'Authenticating...'
  },
  username: {
    defaultValue: '',
    hint: 'Input User ID', // hintText
    label: 'User ID', // floatingLabelText
    stringRequired: 'Required',
    validationType: _MuiCompInputTextField.VALIDATION_TYPES.TYPE_REQUIRED
  },
  password: {
    defaultValue: '',
    hint: 'Input password', // hintText
    label: 'Password', // floatingLabelText
    stringRequired: 'Required',
    validationType: _MuiCompInputTextField.VALIDATION_TYPES.TYPE_REQUIRED
  },
  authButtonLabel: 'Login'
};

var progressStyle = {
  display: 'none',
  position: 'absolute',
  /* top: '10%', */
  left: '50%',
  bottom: '10%',
  marginTop: '-50px',
  marginLeft: '-50px'
  /* z-index: -1; ERROR. Don't do this. */
};

var progressSize = {
  size: 200,
  thickness: 16
};

var statusStyle = {
  color: '#A00',
  fontSize: '1.4rem'
};

var authStyle = {
  textAlign: 'center',
  paddingBottom: '10px',
  backgroundColor: 'white'
};

module.exports = {
  defaultLoginConf: defaultLoginConf,
  progressStyle: progressStyle,
  progressSize: progressSize,
  statusStyle: statusStyle,
  authStyle: authStyle
};