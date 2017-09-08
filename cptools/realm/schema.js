'use strict'

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

module.exports.schema = schema
