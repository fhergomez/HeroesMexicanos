'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HeroSchema = new Schema ({
  image: String,
  linkURL: String,
  title: String,
  description: String,
  tags: [{
    type: String
  }]
});

module.exports = mongoose.model('Hero', HeroSchema);