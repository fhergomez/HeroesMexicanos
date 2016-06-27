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

router.get('/:heroeId', controller.singleHeroe);
router.get('/popHeroes/:id', controller.popHeroes);

router.delete('/:id', controller.delete);

module.exports = router;