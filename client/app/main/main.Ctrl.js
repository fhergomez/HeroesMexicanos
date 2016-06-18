(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal', 'heroesAPI', 'scrapeAPI', '$alert','Upload'];

  function MainCtrl($scope, $state, Auth, $modal, heroesAPI, scrapeAPI, $alert, Upload) {
    $scope.user = Auth.getCurrentUser();

    $scope.heroe = {};
    $scope.heroes = [];
    $scope.scrapePostForm = true;
    $scope.showScrapeDetails = false;
    $scope.gotScrapeResults = false;
    $scope.loading = false; // spinner

    $scope.picPreview = true;
    $scope.uploadHeroeForm = false;
    $scope.uploadHeroeTitle = true;

    var alertSuccess = $alert({
      title: 'Felicidades!',
      content: 'Tu nuevo héroe ha sido añadido',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'success',
      duration: 8
    });

    var alertFail = $alert({
      title: 'No se guardo tu héroe!',
      content: 'Tu nuevo héroe no se añadio',
      placement: 'top-right',
      container: '#alertContainer',
      type: 'warning',
      duration: 8
    })

    var myModal = $modal({ // this will trigger the modal popup
      scope: $scope,
      show: false
    }); // this code is taken from the Angular-Strap modal documentation

    $scope.showModal = function(){
      myModal.$promise.then(myModal.show);
    }

    // will display all heroes from database
    heroesAPI.getAllHeroes().then(function(data){
      console.log('looks found ');
      console.log(data);
      $scope.heroes = data.data;
    }).catch(function(err){
      console.log('failed to get heroes' + err);
    });

    $scope.showUploadForm = function(){
      $scope.uploadHeroeForm = true;
      $scope.scrapePostForm = false;
      $scope.uploadHeroeTitle = false;
    }

    // Watch for changes to URL, scrape and display resuslts
    $scope.$watch('heroe.link', function(newVal, oldVal){
      if (newVal.length > 5) {
        $scope.loading = true;
        var link = {
          url:$scope.heroe.link
        }
        scrapeAPI.getScrapeDetails(link).then(function(data){
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
      heroesAPI.createScrapeHeroe(heroe).then(function(data){
        alertSuccess.show();
        $scope.showScrapeDetails = false;
        $scope.gotScrapeResults = false;
        $scope.heroe.title = "";
        $scope.heroe.link = "";
        $scope.heroes.splice(0,0,data.data);
        console.log(data);
      }).catch(function(){
        alertFail.show();
        console.log('failed to post');
        console.log(alertFail);
        $scope.showScrapeDetails = false;
      })
    }

    $scope.uploadPic = function(file){
      upload.upload({
        url: 'api/heroe/upload',
        headers: {
          'Content-Type':'multipart/form-data'
        },
        data:{
          file: file,
          title: $scope.heroe.title,
          description: $scope.heroe.description,
          email: $scope.user.email,
          name: $scope.user.name,
          linkURL: $scope.heroe._id,
          _creator: $scope.user._id
        }
      }).then(function(resp){
        console.log('successful ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        $scope.heroes.splice(0,0,resp.data);
        $scope.heroe.title = "";
        $scope.heroe.description = "";
        $scope.picFile = "";
        $scope.picPreview = false;
        alertSuccess.show();
      },function(resp){
        alertFail.show();
      },function(evt){
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('Progress: ' + progressPercentage + '%' + evt.config.data.file.name);
      });
    }
  }
})();