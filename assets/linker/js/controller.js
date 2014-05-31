/**
 * Created by Secretmapper on 4/9/14.
 */

angular.module('ruppApp.controllers', [])

.controller('HeadCtrl', function($scope, $rootScope){
  $rootScope.$watch('meta', function(newVal, oldVal){
    if(newVal === oldVal) {
      return; //prevent watch on init
    }
    $scope.meta = $rootScope.meta;
    $scope.htmlReady();
  });
  $scope.meta = $rootScope.meta;
})

.controller('HomePageCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
  $scope.email = 'Frpergznccre16@tznvy.pbz';
}])

.controller('NavBarCtrl', ['$scope', '$state', 'apiService', function ($scope, $state, apiService) {
    $scope.findProfessor = function(val) {
      return apiService.findProfessor(val).then(function(res){
        var professors = [];

        professors = res;

        if(professors.length == 0) {
          var item = {};
          item.name = "No Results Found";
          item.NoResults = true;
          professors.push(item);
        }

        return professors;
      });
    };
    $scope.routeProfessorSearch = function(item){
      if(item.NoResults) return;
      $scope.selectProfessor(item);
    };
    $scope.selectProfessor = function(professor){
      $state.go('rupp.professor', {profId:professor.id});
    };
}])

.controller('MainViewCtrl', ['$rootScope', '$scope', '$stateParams', 'apiService', 'reviewService', '$location',
    function ($rootScope, $scope, $stateParams, apiService, reviewService, $location) {
  $scope.profId = $stateParams.profId;
  $scope.reviewMax = reviewService.reviewMax;

  apiService.getProfessor($scope.profId).then(function(res){
    $scope.professor = res;
    $scope.professor.fullName = res.firstName + ' ' + res.lastName;
    
    $rootScope.meta = {
      title: $scope.professor.fullName + ' at Rate UP Professors!',
      url: $location.url,
      description: 'Took ' + $scope.professor.fullName + "'s class or Planning on taking it? Find out past student's " +
                  "thoughts or add your own!",
      image: null
    };
  });

  $scope.changePage = function(id){
    reviewService.getReviews($scope.profId, id).then(function(res){
      $scope.reviews = res.reviews;
    });
  }

  reviewService.getReviews($scope.profId, 1, true).then(function(res){
    $scope.reviews = res.reviews;
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

    $scope.userAgreement = false;
    $scope.duplicateProf = true;

    $scope.onNameBlur = function(){
      if($scope.professor.firstName && $scope.professor.lastName) {
        var query = {firstName: $scope.professor.firstName, lastName: $scope.professor.lastName};
          apiService.findDuplicate(query).then(function(res){
            if(res){
              res.name = res.firstName + " " + res.lastName;
              res.sentinel = true;
              $scope.duplicateProf = res;
            } else {
              $scope.duplicateProf = false;
            }
        })
      }
    }

    $scope.formCallback = function(val){
      apiService.createProfessor(val).then(function(res){
        $state.go('rupp.professor', {profId:res.id});
      })
    }
}])


.controller('ProfessorListCtrl', ['$scope', '$state', 'apiService', function ($scope, $state, apiService) {
  $scope.professor = {};
    /*
  ($scope.formCallback = function(){
    apiService.getTopProfessors().then(function(res){
      $state.go('rupp.professor', {profId:res.id});
    })
  })();*/
}])