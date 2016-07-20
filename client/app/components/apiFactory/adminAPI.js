(function(){
  'use strict';

  angular.module('app').factory('adminAPI', adminAPI);

  adminAPI.$injet = ['$http'];

  function adminAPI($http){
    return {
      getAllUsers: getAllUsers,
      getOneUser: getOneUser,
      deleteUser: deleteUser
    }

    function getAllUsers(){
      var url = 'api/users';
      return $http.get(url, {
        cache: true
      });
    }

    function getOneUser(id){
      var url = 'api/users/' + id;
      return $http.get(url);
    }

    function deleteUser(){
      var url = 'api/users/' + user._id;
      return $http.delete(url);
    }
  }
})();