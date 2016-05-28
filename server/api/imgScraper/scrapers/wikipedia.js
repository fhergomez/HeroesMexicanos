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
      var $img = $('.image img').attr('src'); // get from wikipedia
      var $desc = $('.mw-content-ltr p:first-child b') // description from wikipedia

      console.log($img + ' pin url');

      var pin = {
        img: $img,
        url: $url,
        desc: $desc
      }

      // respond with the final JSON object
      cb(pin);
    }
  });
}