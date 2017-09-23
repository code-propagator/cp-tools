'use strict'

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

module.exports = {
  progressStyle,
  progressSize
}
