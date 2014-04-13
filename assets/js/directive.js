/**
 * Created by Secretmapper on 4/9/14.
 */

angular.module('ruppApp.directives', [])

.directive('holderJs', function () {
  return {
    link: function (scope, element, attr) {
      element.attr('src', 'holder.js/' + element.attr('holder-js'));
      Holder.run({ images: element[0], nocss: true });
    }
  };
})

.directive('reviewRating', ['reviewService', function(reviewService){
  return {
    restrict: 'AE',
    scope: {
      rating: '=value'
    },
    templateUrl: '/templates/reviewRating.html',
    link: function($scope){
      var ratingSum = $scope.rating.reduce(function(a, b){
        return {value: a.value + b.value};
      });
      $scope.ratingAverage = (ratingSum.value / $scope.rating.length).toFixed(2);

      $scope.reviewMax = reviewService.reviewMax;
    }
  }
}])

.directive('accessibleForm', function () {
  return {
    restrict: 'AE',
    transclude: true,
    template: '<form name="accessForm"><submit-form></submit-form></form>',
    link: function($scope, $element) {
      $scope.formCallback = function(val) {
        $scope.accessFormObj.submitForm(val);
        window.scrollTo(0, 0);
      }
    }
  };
})

.directive('submitForm', function() {
  return {
    restrict: 'AE',
    //require: '^accessibleForm',
    templateUrl: '/templates/accessibleForm.html',
    link: function($scope, elem, attrs, formCtrl){
      //$scope.formCallback = formCtrl.formCallback;
    }
  }
})

.directive('professorList', function (apiService) {
  return {
    restrict: 'AE',
    scope: {
      professors: '='
    },
    templateUrl:'/templates/professorList.html',
    link: function ($scope, elem) {
      apiService.getTopProfessors().then(function(data){
        console.log(data);
      })
    }
  };
})

.directive('ruppClass', [function(){
  return {
    restrict: 'AE',
    templateUrl: '/templates/class.html',
    link:function(){
    }
  }
}])