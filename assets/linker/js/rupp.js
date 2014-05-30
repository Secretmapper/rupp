/**
 * Created by Secretmapper on 4/9/14.
 */

angular.module('ruppApp', ['ruppApp.directives', 'ruppApp.controllers', 'ruppApp.services',
                           'ui.bootstrap', 'ui.router',
                           'angularjs-facebook-sdk'])

.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
      input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
})

.filter('rot13decrypt', function() {
  return function(input, scope) {
    if (input != null)
      input = input.replace(/[a-zA-Z]/g, function(c){return String.fromCharCode((c<="Z"?90:122)>=(c=c.charCodeAt(0)+13)?c:c-26)});
    return input;
  }
})

.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider){
    $stateProvider
      .state('rupp', {
        url: '/main',
        abstract: true,
        templateUrl: '/partials/home.html'
      })
      .state('rupp.index', {
        url: '/search-prof',
        templateUrl: '/partials/homepage.html',
        controller: 'HomePageCtrl'
      })
      .state('rupp.needReview', {
        url: '/needreview',
        templateUrl: '/partials/needingReview.html',
      })
      .state('rupp.professor', {
        url: '/viewprof/{profId:[^\s]+}',
        templateUrl: '/partials/viewProf.html',
        controller: 'MainViewCtrl'
      })
      .state('rupp.rate', {
        url: '/rateprof/:profId',
        templateUrl: '/partials/rateClass.html'
      })
      .state('rupp.topProfessors', {
        url: '/top-professors',
        templateUrl: '/partials/topProfessors.html'
      })
      .state('rupp.addProfessor', {
        url: '/add-professor',
        templateUrl: '/partials/addProfessor.html',
        controller: 'AddProfessorCtrl'
      })
      .state('rupp.contact', {
        url: '/contact',
        templateUrl: '/partials/contact.html'
      })
    $urlRouterProvider.otherwise('/main/search-prof');
    $locationProvider.html5Mode(true).hashPrefix('!');;
  }])

.config(function (facebookConfigProvider) {
  facebookConfigProvider.setAppId(475573052545126);
  facebookConfigProvider.setLanguage('en-US');
  facebookConfigProvider.setDebug(true);

  facebookConfigProvider.autoInit(true);

  // Same: developers.facebook.com/docs/javascript/reference/FB.init/
  facebookConfigProvider.setOptions({
    status: true
  });
})

.run(['$rootScope', function($rootScope){
    $rootScope.domain = 'http://localhost:1337';
    $rootScope.assetDomain = '//' //root
    //$rootScope.domain = 'http://rupp.herokuapp.com';

    $rootScope.meta = {
      title: 'Rate UP Professors!',
      url: $rootScope.domain,
      description: 'Review and Rate UP Professors Anonymously!',
      image: null
    };;
}])