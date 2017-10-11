'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var events = require('events');

// https://nodejs.org/api/events.html
// ### TURN OFF THE LIMITS OF LISTENERS
console.log('default max', events.EventEmitter.defaultMaxListeners);
events.EventEmitter.defaultMaxListeners = 0;
console.log('---> max', events.EventEmitter.defaultMaxListeners);
// emitter.updateEmitter.setMaxListeners(emitter.updateEmitter.getMaxListeners() + 1)
// ===> THIS DOESN'T WORK ANY LONGER!

var emitterFactory = function emitterFactory(eventName) {
  // create a emitter
  var myEmitter = new events.EventEmitter();
  console.log('EventEmitter is created for eventName', eventName);
  // (node:62909) MaxListenersExceededWarning: Possible EventEmitter memory leak detected.
  // 11 asynchronous-reply listeners added. Use emitter.setMaxListeners() to increase limit
  myEmitter.setMaxListeners(0);

  var myEmitterCallbacks = {};

  var subscribe = function subscribe(uuid, callback) {
    console.log('subscribe', eventName, uuid, callback);
    myEmitterCallbacks[uuid] = callback;
  };

  var unsubscribe = function unsubscribe(uuid) {
    console.log('unsubscribe', eventName, uuid);
    delete myEmitterCallbacks[uuid];
  };

  myEmitter.on(eventName, function (arg) {
    console.log('emitter RECEIVED', eventName, arg);

    // call subscribers
    var keys = (0, _keys2.default)(myEmitterCallbacks);
    console.log('subscribers', keys);
    keys.map(function (uuid) {
      var cbFunc = myEmitterCallbacks[uuid];
      cbFunc(arg);
    });
  });

  myEmitter.subscribe = subscribe.bind(undefined);
  myEmitter.unsubscribe = unsubscribe.bind(undefined);
  myEmitter.eventName = eventName;

  return myEmitter;
};

var emitters = {};

var updateEmitter = emitterFactory('force-update');
var authEmitter = emitterFactory('auth-done');

emitters['force-update'] = updateEmitter;
emitters['auth-done'] = authEmitter;

module.exports = {
  emitterFactory: emitterFactory,
  emitters: emitters,
  updateEmitter: updateEmitter,
  authEmitter: authEmitter
};