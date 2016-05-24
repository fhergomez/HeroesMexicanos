'use strict';

var request = require('request');
var cheerio = require('cheerio');

// creates list method used in the imgScraper.controller file
exports.list = function(url,cb){
  request(url,function(error,res,body){
    if (error) {
      cb({
        error: error
      });
    }
    if (!error) {
      var $ = cheerio.load(body);
      var pin = {};
      var $url = url;
      var $img = // get from wikipedia
      var $desc = // description from wikipedia
    }
  })
}