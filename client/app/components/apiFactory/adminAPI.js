(function(){
  'use strict';

  angular.module('app').factory('adminAPI', adminAPI);

  adminAPI.$injet = ['$http'];

  function adminAPI($http){
    return {
      getAllUsers,
      deleteUser
    }
  }
})();