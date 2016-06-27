'use strict';

var _ = require('lodash');
var Heroe = require('./heroe.model');
var path = require('path');
var express = require('express');
var utils = require('../../utils/utils.js');

exports.allHeroes = function(req, res) {
  Heroe.find({})
    .sort({
      createTime: -1
    })
    .exec(function(err, heroes) {
      if(err){
        return handleError(res, err);
      }
      if(!heroes) {
        return res.send(404);
      }
      console.log(heroes);
      return res.status(200)
        .json(heroes);
    });
};

exports.userHeroes = function(req,res){
  var userEmail = req.query.email;
  Heroe.find({
    email:{
      $in: userEmail
    }
  }).sort({
    createTime: -1
  }).exec(function(err,heroes){
    if(err){
      return handleError(res,err);
    }
    console.log(heroes);
    return res.status(200).json(heroes);
  });
};

exports.scrapeUpload = function(req, res) {
  var random = utils.randomizer(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  utils.downloadURI(req.body.image, './client/assets/images/uploads/' + random + '.png', function(filename) {
    console.log('done');

    var newHeroe = new Heroe();
    newHeroe.title = req.body.title;
    newHeroe.email = req.body.email;
    newHeroe.linkURL = req.body.linkURL;
    newHeroe.description = req.body.description;
    newHeroe.userName = req.body.name;
    newHeroe._creator = req.body._creator;
    newHeroe.createTime = Date.now();
    newHeroe.upVotes = 0;
    newHeroe.image = filename.slice(9);
    newHeroe.save(function(err, item) {
      if (err) {
        console.log('error occured saving image');
      } else {
        console.log('Success post saved');
        console.log(item);
        res.status(200)
          .json(item);
      }
    });
  });
}

exports.popHeroes = function(req, res) {
  Heroe.find(req.params.id)
    .sort('-upVotes') // get max number
    .limit(6)
    .exec(function(err, heroes) {
      if (err) {
        return handleError(res, err);
      }
      console.log(heroes);
      return res.json(heroes);
    });
}

exports.upload = function(req,res){
  var newHeroe = new Heroe();
  var fileimage = req.middlewareStorage.fileimage;

  newHeroe.image = '/assets/images/uploads/' + fileimage;
  newHeroe.email = req.body.email;
  newHeroe.linkURL = req.body.linkURL;
  newHeroe.title = req.body.title;
  newHeroe.description = req.body.description;
  newHeroe.userName = req.body.name;
  newHeroe. _creator = req.body._creator
  newHeroe.createTime = Date.now();
  newHeroe.upVotes = 0;
  newHeroe.save(function(err, heroe) {
    if (err) {
      console.log('error occured saving image');
    } else {
      console.log('Success post saved');
      console.log(heroe);
      res.status(200)
        .send(heroe);
    }
  });
}

exports.singleHeroe = function(req,res){
  Heroe.findById(req.params.heroeId,function(err, heroe){
    if(err){
      return handleError(res,err);
    }
    if(!heroe){
      return res.send(404);
    }
    return res.json(heroe);
  });
};

exports.update = function(req,res){
  if(req.body._id){
    delete req.body._id;
  }
  Heroe.findById(req.params.id,function(err, heroe){
    if(err){
      return handleError(res,err);
    }
    if(!heroe){
      return res.send(404);
    }
    var updated = _.merge(heroe, req.body);
    updated.save(function(err){
      if(err){
        return handleError(res, err);
      }
      console.log(heroe);
      return res.json(heroe);
    });
  });
};

exports.delete = function(req,res){
  Heroe.findById(req.params.id,function(err, heroe){
    if(err){
      return handleError(res,err);
    }
    if(!heroe){
      return res.send(404);
    }
    heroe.remove(function(err){
      if(err){
        return handleError(res,err);
      }
      return res.send(200);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}