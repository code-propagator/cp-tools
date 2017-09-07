'use strict';

var PostSchema = {
  name: 'Post',
  properties: {
    timestamp: 'date',
    title: 'string',
    content: 'string'
  }
};

var UsersSchema = {
  name: 'User',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    username: 'string',
    age: 'int',
    role: 'string',
    created_at: 'date'
  }
};

var schema = [PostSchema, UsersSchema];

module.exports.schema = schema;