let EventEmitter = require('events').EventEmitter
// import { EventEmitter } from 'events'

const updateEmitter = new EventEmitter()

module.exports.updateEmitter = updateEmitter
