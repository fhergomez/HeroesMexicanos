(function() {
  'use strict';

  angular
    .module('app')
    .controller('MyHeroesCtrl', MyHeroesCtrl);

  MyHeroesCtrl.$inject = ['$scope', '$modal', '$state', '$alert', 'heroesAPI', 'Auth'];

  function MyHeroesCtrl($scope, $modal, $state, $alert, heroesAPI, Auth) {

    $scope.user = Auth.getCurrentUser();
    var userEmail = $scope.user.email;

    $scope.userHeroes = [];
    $scope.editHeroe = {};

    var alertSuccess = $alert({
      title: 'Guardado ',
      content: 'Heroe ha sido editado',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'success',
      duration: 8
    });

    var alertFail = $alert({
      title: 'No se guardo ',
      content: 'Heroe no ha sido editado',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'warning',
      duration: 8
    });

    var myModal = $modal({
      scope: $scope,
      show: false
    });

    $scope.showModal = function() {
      myModal.$promise.then(myModal.show);
    }

    $scope.noHeroes = function() {
      $scope.userHeroes.length === 0;
    }

    heroesAPI.getUserHeroes(userEmail)
      .then(function(data) {
        console.log(data);
        $scope.userHeroes = data.data;
      })
      .catch(function(err) {
        console.log('fallo en conseguir heroes para el usuario ' + err);
      });

    $scope.editHeroe = function(heroe) {
      heroesAPI.getUpdateHeroe(heroe)
        .then(function(data) {
          console.log(data);
          $scope.editHeroe = data.data;
        }).catch(function(err) {
          console.log('fallo en editar tu heroe ' + err);
        });
    }

    $scope.saveHeroe = function() {
      var heroe = $scope.editHeroe;

      heroesAPI.updateHeroe(heroe)
        .then(function(data) {
          console.log('Heroe se actualizo');
          console.log(data);
          $scope.editHeroe.title = '';
          $scope.editHeroe.description = '';
          alertSuccess.show();
        }).catch(function(err) {
          console.log('fallo en actualizar' + err);
          alertFail.show();
        });
    }

    $scope.delete = function(heroe) {
      var index = $scope.userHeroes.indexOf(heroe);

      heroesAPI.deleteHeroe(heroe)
        .then(function(data) {
          console.log('éxito!, heroe ha sido eliminado');
          $scope.userHeroes.splice(index, 1);
        }).catch(function(err) {
          console.log('fallo en eliminar tu heroe' + err);
        });
    }

  }
})();