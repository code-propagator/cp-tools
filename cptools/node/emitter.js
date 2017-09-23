let events = require('events')

// https://nodejs.org/api/events.html
// ### TURN OFF THE LIMITS OF LISTENERS
console.log('default max', events.EventEmitter.defaultMaxListeners)
events.EventEmitter.defaultMaxListeners = 0
console.log('---> max', events.EventEmitter.defaultMaxListeners)
// emitter.updateEmitter.setMaxListeners(emitter.updateEmitter.getMaxListeners() + 1)
// ===> THIS DOESN'T WORK ANY LONGER!

// 'force-update'
let emitterFactory = (eventName) => {
  // create a emitter
  let myEmitter = new events.EventEmitter()
  console.log('EventEmitter is created for eventName', eventName)

  let myEmitterCallbacks = {}

  let subscribe = (uuid, callback) => {
    console.log('subscribe', eventName, uuid, callback)
    myEmitterCallbacks[uuid] = callback
  }

  let unsubscribe = (uuid) => {
    console.log('unsubscribe', eventName, uuid)
    delete myEmitterCallbacks[uuid]
  }

  myEmitter.on(eventName, (arg) => {
    console.log('emitter RECEIVED', eventName, arg)

    // call subscribers
    let keys = Object.keys(myEmitterCallbacks)
    console.log('subscribers', keys)
    keys.map((uuid) => {
      let cbFunc = myEmitterCallbacks[uuid]
      cbFunc(arg)
    })
  })

  myEmitter.subscribe = subscribe.bind(this)
  myEmitter.unsubscribe = unsubscribe.bind(this)
  myEmitter.eventName = eventName

  return myEmitter
}

let emitters = {}

let updateEmitter = emitterFactory('force-update')
let authEmitter = emitterFactory('auth-done')

emitters['force-update'] = updateEmitter
emitters['auth-done'] = authEmitter

module.exports.emitterFactory = emitterFactory
module.exports.emitters = emitters
module.exports.updateEmitter = updateEmitter
module.exports.authEmitter = authEmitter
