(function() {
  'use strict';

  angular.module('app').config(config);

  config.$inject = ['$stateProvider'];

  function config($stateProvider) {
    $stateProvider.state('myheroes', {
      url: '/myheroes',
      templateUrl: 'app/myheroes/myHeroes.html',
      controller: 'MyHeroesCtrl',
      authenticate: true
    });
  }
})();