'use strict';

var comment = require('/comment.model');
var express = require('express');

exports.addComment = function(req,res) {
  var newComment = newComment();
  newComment.author.id = req.body.authorId;
  newComment.author.name = req.body.authorName;
  newComment.author.email = req.body.authorEmail;
  newComment.gravatar = req.body.gravatar;
  newComment.comment = req.body.comment;
  newComment.heroeId = req.body.lookId;
  newComment.createTime = Date.now();

  newcomment.save(function(err, comment){
    if(err){
      console.log('error saving comment');
      return res.send(500);
    } else {
      console.log(comment);
      res.status(200).json(comment);
    }
  });
};

exports.getComments = function(req,res){
  Comment.find({
    'heroeId': req.params.id
  }).sort({
    createTime: -1
  })
}