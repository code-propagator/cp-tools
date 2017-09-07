const Realm = require('realm')
let uuidv4 = require('uuid/v4')

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

console.log('#### DATABSE ####')
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

let dbPath = 'default.realm'
let dbSchema = []

let registerPathAndSchema = (path, schema) => {
  dbPath = path
  dbSchema = schema
  // Synchronously open the Realm at first.
  let realm = new Realm({
    path: dbPath,
    schema: dbSchema
  })
  return realm
}

let listen = (objects) => {
  objects.addListener((arr, changes) => {
    console.log('objects changed')

    // Update UI in response to inserted objects
    changes.insertions.forEach((index) => {
      let inserted = arr[index]
      console.log('---> inserted', inserted)
    })
    // Update UI in response to modified objects
    changes.modifications.forEach((index) => {
      let modified = arr[index]
      console.log('---> modified', modified)
    })
    // Update UI in response to deleted objects
    changes.deletions.forEach((index) => {
      // Deleted objects cannot be accessed directly
      // Support for accessing deleted objects coming soon...
      console.log('---> deleted')
    })
  })
}

let putItem = (realm, name, item) => {
  realm.write(() => {
    realm.create(name, item)
  })
}

let testDB = () => {
  // Synchronously open the Realm at first.
  let realm = new Realm({
    path: dbPath,
    schema: dbSchema
  })

  // Observe Realm Notifications
  let myFunc = () => {
    console.log('### realm changed')
  }
  realm.addListener('change', myFunc)

  // ..later remove the listener
  // realm.removeListener('change', ...)

  // ..or unregister all listeners
  // realm.removeAllListeners()

  let posts = realm.objects('Post').sorted('timestamp', true)
  listen(posts)

  let users = realm.objects('User').sorted('created_at', true)
  listen(users)

  // Do someting with database.
  let getBlog = () => {
    return {
      Post: posts,
      User: users
    }
  }

  let putPost = (realm, title, content, timestamp) => {
    putItem(realm, 'Post', {
      title: title,
      content: content,
      timestamp: timestamp
    })
  }

  let putUser = (realm, username, age, role, timestamp) => {
    // Take care of primary key so that not to get error.
    // Error: Attempting to create an object of type 'User' with an existing primary key value.
    // https://www.npmjs.com/package/uuid
    putItem(realm, 'User', {
      uuid: uuidv4(),
      username: username,
      age: age,
      role: role,
      created_at: timestamp
    })
  }

  let myAsyncTask1 = async () => {
    try {
      const res = await (() => {
        return new Promise(
          (resolve, reject) => {
            try {
              let timestamp = new Date()
              putPost(realm, 'Test', 'Hello. Electron can handle Realm for JavaScript!', timestamp)
              putUser(realm, 'Me', 3, 'user', timestamp)
              return console.log(resolve('Task1 OK'))
            } catch (err) {
              return reject(err)
            }
          }
        )
      })()

      return console.log('DONE myAsyncTask1', res)
    } catch (err) {
      return console.error('ERROR in myAsyncTask1', err)
    }
  }

  let myAsyncTask2 = async () => {
    try {
      const res = await (() => {
        return new Promise(
          (resolve, reject) => {
            try {
              let blog = getBlog()
              console.log('blog.posts.length', blog.Post.length)
              console.log('blog.users.length', blog.User.length)
              return console.log(resolve('Task2 OK'))
            } catch (err) {
              return reject(err)
            }
          }
        )
      })()

      return console.log('DONE myAsyncTask2', res)
    } catch (err) {
      return console.error('ERROR in myAsyncTask2', err)
    }
  }

  myAsyncTask1().catch((err) => {
    console.log('CAUGHT ERROR', err)
  })

  myAsyncTask2().catch((err) => {
    console.log('CAUGHT ERROR', err)
  })

  realm.removeListener('change', myFunc)
}

let allData = () => {
  // Synchronously open the Realm at first.
  let realm = new Realm({
    path: dbPath,
    schema: dbSchema
  })

  var all = {}
  dbSchema.map((def) => {
    let name = def.name
    all[name] = realm.objects(name)
    // not sorted
  })

  // let posts = realm.objects('Post').sorted('timestamp', true)
  // let users = realm.objects('User').sorted('created_at', true)
  // return {Post: posts, User: users}

  return all
}

let subscribeChange = (monitor) => {
  // Synchronously open the Realm at first.
  let realm = new Realm({
    path: dbPath,
    schema: dbSchema
  })

  realm.addListener('change', monitor)
}

let unsubscribeChange = (monitor) => {
  // Synchronously open the Realm at first.
  let realm = new Realm({
    path: dbPath,
    schema: dbSchema
  })

  realm.removeListener('change', monitor)
}

module.exports = {
  dbPath,
  dbSchema,
  registerPathAndSchema,
  testDB,
  allData,
  subscribeChange,
  unsubscribeChange
}
