(function(){
  'use strict';

  angular.module('app').controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$scope','Auth', 'AdminAPI'];

  $scope.user = Auth.getCurrentUser();
  $scope.profileInfo = {};
  var id = $scope.user._id;

  adminAPI.getOneUser(id).then(function(data){
    console.log(data);
    $scope.profileInfo = data.data;
  }) .catch(function(err){
    console.log("Fallo en conseguir tu data que necesitas");
    console.log(err);
  });

})();