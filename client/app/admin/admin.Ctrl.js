(function() {
  'use strict';

  angular
    .module('app')
    .controller('AdminCtrl', AdminCtrl);

  AdminCtrl.$inject = ['$scope', 'Auth', '$modal', 'adminAPI','$alert', 'heroesAPI'];

  function AdminCtrl($scope, Auth, $modal, adminAPI, $alert, heroesAPI) {
    $scope.heroes = [];
    $scope.users = [];
    $scope.user = {};
    $scope.editHeroe = {};
    $scope.deleteBtn = true;

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

    adminAPI.getAllUsers().then(function(data){
      $scope.users = data.data;
    }).catch(function(err){
      console.log('hubo un error para conseguir usuarios');
      console.log(err);
    });

    heroesAPI.getAllHeroes().then(function(data){
      console.log(data);
      $scope.heroes = data.data;
    }).catch(function(err){
      console.log('fallo en conseguir todos los heroes');
    });

    $scope.deleteUser = function(user){
      adminAPI.deleteUser(user).then(function(data){
        console.log('El usuario ha sido borrado');
        var index = $scope.users.indexOf(user);
        $scope.users.splice(index,1);
      }).catch(function(err){
        console.log(err);
        console.log('fallo en borrar el usuario');
      });
    }

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

    $scope.deleteHeroe = function(heroe) {
      heroesAPI.deleteHeroe(heroe)
        .then(function(data) {
          var index = $scope.heroes.indexOf(heroe);
          $scope.editHeroe.description = '';
          $scope.editHeroe.title = '';
          $scope.deleteBtn = false;
          alertSuccess.show();
          $scope.heroes.splice(index, 1);
          console.log('éxito!, heroe ha sido eliminado');
        }).catch(function(err) {
          alertFail.show();
          console.log('fallo en eliminar tu heroe' + err);
        });
    }
  }
})();