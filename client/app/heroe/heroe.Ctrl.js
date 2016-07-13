(function() {
  'use strict';

  angular.module('app').controller('HeroeCtrl', HeroeCtrl);

  HeroeCtrl.$inject = ['$scope', '$stateParams', 'heroesAPI', 'commentAPI', 'Auth'];

  function HeroeCtrl($scope, $stateParams, heroesAPI, commentAPI, Auth){
    $scope.user = Auth.getCurrentUser();
    $scope.id = $stateParams.heroeId;
    $scope.popHeroes = [];

    heroesAPI.findOneHeroe($scope.id).then(function(data){
      console.log(data);
      $scope.heroe = data.data;
      // addView();
    }).catch(function(err){
      console.log('HeroesCtrl');
      console.log('Fallo en conseguir tu heroe', err);
    });

    heroesAPI.popHeroes($scope.id)
      .then(function(data){
      console.log(data);
      $scope.popHeroes = data.data;
    }).catch(function(err){
      console.log('Fallo en conseguir tu pop heroe', err);
    });

    commentAPI.getComments($scope.id).then(function(data){
      console.log(data);
      $scope.comments = data.data;
    }).catch(function(err){
      console.log('Fallo en conseguir comentarios', err);
    });

    // Post new comment
    $scope.postComment = function(){
      var comment = {
        authorId: $scope.user._id,
        authorName: $scope.user.name,
        authorEmail: $scope.user.email,
        gravatar: $scope.user.gravatar,
        comment: $scope.comment.body,
        heroeId: $scope.id
      }
      commentAPI.addComment(comment).then(function(data){
        console.log(data);
        $scope.comment.body = '';
        $scope.comments.splice(0, 0, data.data);
      }).catch(function(err){
        console.log('Fallo en guardar tu comentario', err);
      });

    }
  }
})();