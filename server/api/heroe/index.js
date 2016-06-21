'use strict';

var controller = require('./heroe.controller');
var express = require('express');
var router = express.Router();
var auth = require('../../auth/auth.service');

router.post('/scrapeUpload', auth.isAuthenticated(), controller.scrapeUpload);
router.post('/upload', auth.isAuthenticated(), controller.upload);

router.put('/:id', auth.isAuthenticated(), controller.update);

router.get('/getAllHeroes', controller.allHeroes);
router.get('/getUserHeroes', controller.userHeroes);
router.get('/:heroId', controller.singleHeroe);

router.delete('/:id', controller.delete);

router.get('/heroe', function(req, res){
  Heroe.find({}, function(err, heroes){
    if(err){
      return res.status(500).err.message(err);
    }
    res.json({heroes: heroes});
  });
});

module.exports = router;