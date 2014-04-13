/**
 * Created by Secretmapper on 4/9/14.
 */

angular.module('ruppApp.controllers', [])

.controller('HomePageCtrl', ['$scope', function($scope){
  $scope.email = 'Frpergznccre16@tznvy.pbz';
}])

.controller('NavBarCtrl', ['$scope', '$state', 'apiService', function ($scope, $state, apiService) {
    $scope.findProfessor = function(val) {
      return apiService.findProfessor(val).then(function(res){
        var professors = [];
        angular.forEach(res, function(item){
          item.name = item.lastName + ', ' + item.firstName
          professors.push(item);
        });
        return professors;
      });
    };
    $scope.selectProfessor = function(professor){
      $state.go('rupp.professor', {profId:professor.id});
    }
}])

.controller('MainViewCtrl', ['$scope', '$stateParams', 'apiService', 'reviewService',
    function ($scope, $stateParams, apiService, reviewService) {
  $scope.profId = $stateParams.profId;
  $scope.reviewMax = reviewService.reviewMax;

  apiService.getProfessor($scope.profId).then(function(res){
    $scope.professor = res;
    $scope.professor.fullName = res.firstName + ' ' + res.lastName;
  });

  $scope.changePage = function(id){
    reviewService.getReviews($scope.profId, id).then(function(res){
      $scope.reviews = res.reviews;
    });
  }

  reviewService.getReviews($scope.profId, 1, true).then(function(res){
    $scope.reviews = res.reviews;
    console.log(res);
  });
}])

.controller('RateClassCtrl', ['$scope', '$state', '$stateParams', 'reviewService',
    function ($scope, $state, $stateParams, reviewService) {
    var scope = $scope;
    $scope.profId = $stateParams.profId;
    $scope.reviewMax = reviewService.reviewMax;
    $scope.fieldDetails = reviewService.fieldDetails;

    $scope.review = {rating:{}}

    $scope.accessFormObj = {
      trySubmit: false,
      submitForm: function(val){
        scope.accessFormObj.trySubmit = true;

        if(scope.accessForm.$valid){
          //todo: validate ratings
          var rating = scope.review.rating;
          if(rating.helpfulness != null || rating.pedagogy != null || rating.easiness != null) {
            if(isFinite(String(rating.helpfulness)) ||
              isFinite(String(rating.pedagogy)) ||
              isFinite(String(rating.easiness))) {
              val.professor_id = scope.profId;
              reviewService.createReview(val).then(function(res){
                $state.go('rupp.professor', {profId:res.professor_id});
              });
            }
          }
        }
        return;
      }
    }

    $scope.years = ['']
    var currYear = new Date().getFullYear();
    for(var i = currYear; i > 1980 ; i--)
    {
      $scope.years.push(i);
    }
}])

.controller('AddProfessorCtrl', ['$scope', '$state', 'apiService', function ($scope, $state, apiService) {
    $scope.professor = {};
    $scope.formCallback = function(val){
      apiService.createProfessor(val).then(function(res){
        console.log(res);
        $state.go('rupp.professor', {profId:res.id});
      })
    }
}])