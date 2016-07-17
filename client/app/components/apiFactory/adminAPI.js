(function(){
  'use strict';

  angular.module('app').factory('adminAPI', adminAPI);

  adminAPI.$injet = ['$http'];

  function adminAPI($http){
    return {
      getAllUsers: getAllUsers,
      deleteUser: deleteUser
    }

    function getAllUsers(){
      var url = 'api/users';
      return $http.get(url, {
        cache: true
      });
    }

    function deleteUser(){
      var url = 'api/users/' + user._id;
      return $http.delete(url);
    }
  }
})();