'use strict';

var controller = require('./heroe.controller');
var express = require('express');
// var router = require('express');
var auth = require('../../auth/auth.service');
var heroe = require('./heroe.model')
var router = express.Router();

router.get('/heroe', function(req, res){
  Heroe.find({}, function(err, heroes){
    if(err){
      return res.status(500).err.message(err);
    }
    res.json({heroes: heroes});
  });
});

module.exports = router;