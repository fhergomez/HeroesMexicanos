(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal', '$http'];

  function MainCtrl($scope, $state, Auth, $modal, $http) {
    $scope.user = Auth.getCurrentUser();

    $scope.heroe = {};
    $scope.scrapePostForm = true;
    $scope.uploadHeroeTitle = true;
    $scope.uploadHeroeForm = false;
    $scope.showScrapeDetails = false;
    $scope.gotScrapeResults = false;
    $scope.loading = false; // spinner

    var myModal = $modal({ // this will trigger the modal popup
      scope: $scope,
      show: false
    }); // this code is taken from the Angular-Strap modal documentation

    $scope.showModal = function(){
      myModal.$promise.then(myModal.show);
    }

    // Watch for changes to URL, scrape and display resuslts
    $scope.$watch('heroe.link', function(newVal, oldVal){
      if (newVal.length > 5) {
        $scope.loading = true;
      }
      $http.post('/api/links/scrape',{
        url: $scope.heroe.link
      }).then(function(data){
        console.log(data);
        $scope.showScrapeDetails = true;
        $scope.gotScrapeResults = true;
        $scope.uploadHeroeTitle = false;
        $scope.heroe.imgThumb = data.data.img;
        $scope.heroe.description = data.data.desc;
      }).catch(function(data){
        console.log('Failed to return from scrape');
        $scope.loading = false;
        $scope.heroe.link = "";
        $scope.gotScrapeResults = false;
      }).finally(function(){
        $scope.loading = false;
        $scope.uploadHeroeForm = false;
      })
    });
  }
})();