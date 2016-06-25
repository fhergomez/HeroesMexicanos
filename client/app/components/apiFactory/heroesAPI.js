(function(){
  'use strict';

  angular.module('app').factory('heroesAPI', heroesAPI);

  heroesAPI.$inject = ['$http'];

  function heroesAPI($http){
    return {
      createScrapeHeroe: createScrapeHeroe,
      getAllHeroes: getAllHeroes,
      getUserHeroes: getUserHeroes,
      findOneHeroe: findOneHeroe,
      getUpdateHeroe: getUpdateHeroe,
      updateHeroe: updateHeroe,
      deleteHeroe: deleteHeroe
    }

    function createScrapeHeroe(heroe){
      return $http.post('/api/heroe/scrapeUpload', heroe);
    }

    function getAllHeroes(){
      return $http.get('/api/heroe/getAllHeroes', {
        cache: true
      });
    }

    function getUserHeroes(id){
      return $http.get('/api/heroe/getUserHeroes/?email=' + id, {
        cache: true
      });
    }

    function findOneHeroe(heroe){
      return $http.get('/api/heroe/' + heroe);
    }

    function getUpdateHeroe(heroe){
      return $http.get('api/heroe/' + heroe._id);
    }

    function updateHeroe(heroe){
      return $http.put('api/heroe/' + heroe._id, heroe);
    }

    function deleteHeroe(heroe){
      return $http.delete('api/heroe/' + heroe._id);
    }
  }

})();