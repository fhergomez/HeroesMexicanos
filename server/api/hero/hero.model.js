'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HeroeSchema = new Schema ({
  image: String,
  linkURL: String,
  title: String,
  description: String,
  tags: [{
    type: String
  }],
  _creator: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  email: String,
  userName: String,
  createTime: {
    type: Date,
    'default': Date.now
  },
  views: {
    type: Number,
    'default': 0
  },
  upVotes: {
    type: Number,
    'default': 0
  }
});

var model = mongoose.model('Heroe', HeroeSchema);

module.exports = model;