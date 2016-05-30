'use strict';

var controller = require('./heroe.controller');
var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');


router.post('/scrapeUpload', auth.isAuthenticated(), controller.scrapeUpload);
// router.get('/getAllHeroes', controller.allHeroes);
// router.get('/heroe', function(req, res){
//   Heroe.find({}, function(err, heroes){
//     if(err){
//       return res.status(500).err.message(err);
//     }
//     res.json({heroes: heroes});
//   });
// });

module.exports = router;