(function(){
  'use strict';

  angular.module('app').factory('heroesAPI', heroesAPI);

  heroesAPI.$inject = ['$http'];

  function heroesAPI($http){
    return {
      createScrapeHeroe: createScrapeHeroe
    }
    function createScrapeHeroe(heroe){
      return $http.post('/api/heroe/scrapeUpload', heroe);
    }
  }

})();