'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Realm = require('realm');
var uuidv4 = require('uuid/v4');

/*
let PostSchema = {
  name: 'Post',
  properties: {
    timestamp: 'date',
    title: 'string',
    content: 'string'
  }
}

let UsersSchema = {
  name: 'User',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    username: 'string',
    age: 'int',
    role: 'string',
    created_at: 'date'
  }
}

let schema = [PostSchema, UsersSchema]
*/

console.log('#### DATABSE ####');
// #### The 'new' should be placed to create Realm connection.
// https://realm.io/docs/javascript/latest/
//
// ===> Setting dbPath = 'database.realm' creates database file
//       at project directory while debug.
//       The location is not at the same location as this database.js src.
//
// ===> After making electronquickstart.app with npm run release,
//      the app halts with error.
//
//      terminating with uncaught exception of type
//    realm::util::File::PermissionDenied: make_dir() failed: Permission denied
//
// ===> Change current working directory of the launched app to userData.
//
/*
const electron = require('electron')
const app = electron.app
let userData = app.getPath('userData')
// #############################################
// https://github.com/realm/realm-js/issues/818
process.chdir(userData)
// #############################################
const path = require('path')
let dbPath = path.join(userData, 'database.realm')
console.log('Database Path', dbPath)
// /Users/codepropagator/Library/Application Support/electronquickstart/database.realm
*/

var dbPath = 'default.realm';
var dbSchema = [];

var registerPathAndSchema = function registerPathAndSchema(path, schema) {
  dbPath = path;
  dbSchema = schema;
  // Synchronously open the Realm at first.
  var realm = new Realm({
    path: dbPath,
    schema: dbSchema
  });
  return realm;
};

var listen = function listen(objects) {
  objects.addListener(function (arr, changes) {
    console.log('objects changed');

    // Update UI in response to inserted objects
    changes.insertions.forEach(function (index) {
      var inserted = arr[index];
      console.log('---> inserted', inserted);
    });
    // Update UI in response to modified objects
    changes.modifications.forEach(function (index) {
      var modified = arr[index];
      console.log('---> modified', modified);
    });
    // Update UI in response to deleted objects
    changes.deletions.forEach(function (index) {
      // Deleted objects cannot be accessed directly
      // Support for accessing deleted objects coming soon...
      console.log('---> deleted');
    });
  });
};

var putItem = function putItem(realm, name, item) {
  realm.write(function () {
    realm.create(name, item);
  });
};

var testDB = function testDB() {
  // Synchronously open the Realm at first.
  var realm = new Realm({
    path: dbPath,
    schema: dbSchema
  });

  // Observe Realm Notifications
  var myFunc = function myFunc() {
    console.log('### realm changed');
  };
  realm.addListener('change', myFunc);

  // ..later remove the listener
  // realm.removeListener('change', ...)

  // ..or unregister all listeners
  // realm.removeAllListeners()

  var posts = realm.objects('Post').sorted('timestamp', true);
  listen(posts);

  var users = realm.objects('User').sorted('created_at', true);
  listen(users);

  // Do someting with database.
  var getBlog = function getBlog() {
    return {
      Post: posts,
      User: users
    };
  };

  var putPost = function putPost(realm, title, content, timestamp) {
    putItem(realm, 'Post', {
      title: title,
      content: content,
      timestamp: timestamp
    });
  };

  var putUser = function putUser(realm, username, age, role, timestamp) {
    // Take care of primary key so that not to get error.
    // Error: Attempting to create an object of type 'User' with an existing primary key value.
    // https://www.npmjs.com/package/uuid
    putItem(realm, 'User', {
      uuid: uuidv4(),
      username: username,
      age: age,
      role: role,
      created_at: timestamp
    });
  };

  var myAsyncTask1 = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var res;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return function () {
                return new _promise2.default(function (resolve, reject) {
                  try {
                    var timestamp = new Date();
                    putPost(realm, 'Test', 'Hello. Electron can handle Realm for JavaScript!', timestamp);
                    putUser(realm, 'Me', 3, 'user', timestamp);
                    return console.log(resolve('Task1 OK'));
                  } catch (err) {
                    return reject(err);
                  }
                });
              }();

            case 3:
              res = _context.sent;
              return _context.abrupt('return', console.log('DONE myAsyncTask1', res));

            case 7:
              _context.prev = 7;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', console.error('ERROR in myAsyncTask1', _context.t0));

            case 10:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 7]]);
    }));

    return function myAsyncTask1() {
      return _ref.apply(this, arguments);
    };
  }();

  var myAsyncTask2 = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var res;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return function () {
                return new _promise2.default(function (resolve, reject) {
                  try {
                    var blog = getBlog();
                    console.log('blog.posts.length', blog.Post.length);
                    console.log('blog.users.length', blog.User.length);
                    return console.log(resolve('Task2 OK'));
                  } catch (err) {
                    return reject(err);
                  }
                });
              }();

            case 3:
              res = _context2.sent;
              return _context2.abrupt('return', console.log('DONE myAsyncTask2', res));

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](0);
              return _context2.abrupt('return', console.error('ERROR in myAsyncTask2', _context2.t0));

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined, [[0, 7]]);
    }));

    return function myAsyncTask2() {
      return _ref2.apply(this, arguments);
    };
  }();

  myAsyncTask1().catch(function (err) {
    console.log('CAUGHT ERROR', err);
  });

  myAsyncTask2().catch(function (err) {
    console.log('CAUGHT ERROR', err);
  });

  realm.removeListener('change', myFunc);
};

var allData = function allData() {
  // Synchronously open the Realm at first.
  var realm = new Realm({
    path: dbPath,
    schema: dbSchema
  });

  var all = {};
  dbSchema.map(function (def) {
    var name = def.name;
    all[name] = realm.objects(name);
    // not sorted
  });

  // let posts = realm.objects('Post').sorted('timestamp', true)
  // let users = realm.objects('User').sorted('created_at', true)
  // return {Post: posts, User: users}

  return all;
};

var subscribeChange = function subscribeChange(monitor) {
  // Synchronously open the Realm at first.
  var realm = new Realm({
    path: dbPath,
    schema: dbSchema
  });

  realm.addListener('change', monitor);
};

var unsubscribeChange = function unsubscribeChange(monitor) {
  // Synchronously open the Realm at first.
  var realm = new Realm({
    path: dbPath,
    schema: dbSchema
  });

  realm.removeListener('change', monitor);
};

module.exports = {
  dbPath: dbPath,
  dbSchema: dbSchema,
  registerPathAndSchema: registerPathAndSchema,
  testDB: testDB,
  allData: allData,
  subscribeChange: subscribeChange,
  unsubscribeChange: unsubscribeChange
};