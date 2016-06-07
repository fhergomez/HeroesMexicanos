(function(){
  'use strict';

  angular.module('app').factory('heroesAPI', heroesAPI);

  heroesAPI.$inject = ['$http'];

  function heroesAPI($http){
    return {
      createScrapeHeroe: createScrapeHeroe,
      getAllHeroes: getAllHeroes
    }

    function getAllHeroes(){
      return $http.get('/api/heroe/getAllHeroes', {
        cache: true
      })
    }

    function createScrapeHeroe(heroe){
      return $http.post('/api/heroe/scrapeUpload', heroe);
    }
  }

})();