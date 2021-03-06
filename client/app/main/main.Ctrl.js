(function() {
  'use strict';

  angular
    .module('app')
    .controller('MainCtrl', MainCtrl);

  MainCtrl.$inject = ['$scope', '$state', 'Auth', '$modal', 'scrapeAPI', '$http','$alert', 'heroesAPI', 'Upload'];

  function MainCtrl($scope, $state, Auth, $modal, scrapeAPI, $http, $alert, heroesAPI, Upload) {
    $scope.user = Auth.getCurrentUser();

    $scope.heroe = {};
    $scope.heroes = [];
    $scope.scrapePostForm = true;
    $scope.showScrapeDetails = false;
    $scope.gotScrapeResults = false;
    $scope.loading = false; // spinner

    $scope.picPreview = true;
    $scope.uploadHeroeTitle = true;
    $scope.uploadHeroeForm = false;

    $scope.busy = true;
    $scope.allData = [];
    var page = 0;
    var step = 4;

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

    $scope.showUploadForm = function(){
      $scope.uploadHeroeForm = true;
      $scope.scrapePostForm = false;
      $scope.uploadHeroeTitle = false;
    }

    // will display all heroes from database
    heroesAPI.getAllHeroes().then(function(data){
      console.log('heroes encontrados ');
      console.log(data);
      // $scope.heroes = data.data;
      $scope.allData = data.data;
      $scope.nextPage();
      $scope.busy = false;
    }).catch(function(err){
      console.log('No pude encontrar heroes ' + err);
    });

    $scope.nextPage = function(){
      var heroeLength = $scope.heroe.length;
      if($scope.busy){
        return;
      }
      $scope.busy = true;
      $scope.heroes = $scope.heroes.concat($scope.allData.splice(page * step, step));
      page++;
      $scope.busy = false;
      if($scope.heroes.length === 0){
        $scope.noMoreData = true;
      }
    };

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

    $scope.addVote = function(heroe){
      heroesAPI.upVoteHeroe(heroe).then(function(data){
        console.log(data);
        heroe.upVotes++;
      }).catch(function(data){
        console.log('No se pudo añadir tu voto');
      });
    }

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
        console.log('no se pudo guardar del frontend');
        console.log(alertFail);
        $scope.showScrapeDetails = false;
        alertFail.show();
      });
    }

    $scope.uploadPic = function(file){
      Upload.upload({
        url: 'api/heroe/upload',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: {
          file: file,
          title: $scope.heroe.title,
          description: $scope.heroe.description,
          email: $scope.user.email,
          name: $scope.user.name,
          linkURL: $scope.heroe._id,
          _creator: $scope.user._id
        }
      }).then(function(resp){
        console.log('successful upload');
        $scope.heroes.splice(0,0, resp.data);
        $scope.heroe.title = '';
        $scope.heroe.description = '';
        $scope.picFile = '';
        $scope.picPreview = false;
        alertSuccess.show();
      }, function(resp) {
        alertFail.show();
      }, function(evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
      });
    }
  }
})();