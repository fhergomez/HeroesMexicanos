'use strict';

var Comment = require('./comment.model');
var express = require('express');

exports.addComment = function(req,res) {
  var newComment = new Comment();
  newComment.author.id = req.body.authorId;
  newComment.author.name = req.body.authorName;
  newComment.author.email = req.body.authorEmail;
  newComment.gravatar = req.body.gravatar;
  newComment.comment = req.body.comment;
  newComment.heroeId = req.body.heroeId;
  newComment.createTime = Date.now();

  newComment.save(function(err, comment){
    if(err){
      console.log('error saving comment');
      return res.send(500);
    } else {
      console.log(comment);
      console.log('Comentario ha sido guardado en la DB');
      res.status(200).json(comment);
    }
  });
};

exports.getComments = function(req,res){
  Comment.find({
    'heroeId': req.params.id
  }).sort({
    createTime: -1
  }).exec(function(err, comments){
    if(err){
      return handleError(res, err);
    }
    if(!comments){
      return res.send(404);
    }
    console.log(comments);
    return res.status(200).json(comments);
  });
}