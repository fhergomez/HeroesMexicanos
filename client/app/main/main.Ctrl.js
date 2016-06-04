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
        });
      }
    });

    $scope.addScrapePost = function(){
      var heroe = {
        description: $scope.heroe.description,
        title: $scope.heroe.title,
        image: $scope.heroe.imgThumb,
        linkURL: $scope.heroe.link,
        email: $scope.user.email,
        name: $scope.user.name,
        _creator: $scope.user._id
      }
      $http.post('./api/heroe/scrapeUpload', heroe).then(function(data){
        $scope.showScrapeDetails = false;
        $scope.gotScrapeResults = false;
        $scope.heroe.title = "";
        $scope.heroe.link = "";
        console.log(data);
      }).catch(function(){
        console.log('failed to post');
        $scope.showScrapeDetails = false;
      })
    }
  }
})();