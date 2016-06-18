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
      console.log($url + " just added");
      var $img = $('.image img').attr('src'); // get from wikipedia
      console.log($img + ' before description');
      var $desc = $('.mw-content-ltr p').eq(0).text(); // description from wikipedia (using first <p> element)

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