var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
  author: {
    id: {
      type: Schema.ObjectId,
      ref: 'User'
    },
    name: {
      type: String
    },
    email: {
      type: String
    }
  },
  lookId: {
    type: Schema.ObjectId,
    ref: 'Heroe'
  },
  gravatar: {
    type: String
  },
  comment: {
    type: String,
    trim: true
  },
  createTime: {
    type: Date,
    'default': Date.now
  }
});

var model = mongoose.model('Comment', CommentSchema);

module.exports = model;