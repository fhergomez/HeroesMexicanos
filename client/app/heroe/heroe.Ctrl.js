(function() {
  'use strict';

  angular.module('app').controller('HeroeCtrl', HeroeCtrl);

  HeroeCtrl.$inject = ['$scope', '$stateParams', 'heroesAPI', 'Auth'];

  function HeroeCtrl($scope, $stateParams, heroesAPI, Auth){
    $scope.user = Auth.getCurrentUser();
    $scope.id = $stateParams.heroeId;
    $scope.popHeroes = [];

    heroesAPI.findOneHeroe($scope.id).then(function(data){
      console.log(data);
      $scope.heroe = data.data;
    }).catch(function(err){
      console.log('HeroesCtrl');
      console.log('Fallo en conseguir tu heroe', err);
    });

    heroesAPI.popHeroes($scope.id)
      .then(function(data){
      console.log(data);
      $scope.popHeroes = data.data;
    }).catch(function(err){
      console.log('Fallo en conseguir tu pop heroe', err);
    });
  }
})();