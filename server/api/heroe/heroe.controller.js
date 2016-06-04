'use strict';

var _ = require('lodash');
var Heroe = require('./heroe.model');
var path = require('path');
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
    })
}

exports.scrapeUpload = function(req, res) {
  var random = utils.randomizer(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');

  utils.downloadURI('http:' + req.body.image, './client/assets/images/uploads/' + random + '.png', function(filename) {
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

function handleError(res, err) {
  return res.send(500, err);
}