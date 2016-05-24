'use strict';

var scrapers = {};

scrapers.['wikipedia'] = require('./scrapers/wikipedia.js');

exports.scrape = function(req,res) {
  var url = req.body.url;
  var scraperToUse;

  if(url.indexOf('wikipedia') > -1) {
    scraperToUse = 'wikipedia';
  } else {
    console.log('cannot locate scraper');
  }
  scrapers[scraperToUse].list(url, function(data){
    console.log('data from scraper:', data);
    res.json(data);
  });
}