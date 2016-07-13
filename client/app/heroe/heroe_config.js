(function() {
  'use strict';

  angular.module('app').config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
      $stateProvider.state('heroe', {
        url: '/heroe/:heroeId',
        templateUrl: 'app/heroe/heroe_detail_view.html',
        controller: 'HeroeCtrl'
      });
    }
})();