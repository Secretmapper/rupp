/**
* Created by Secretmapper on 4/9/14.
*/

angular.module('ruppApp.services', [])

.factory('apiService', ['$http', '$rootScope', function($http, $rootScope) {
    function addName(res){
      angular.forEach(res, function(item){
        item.name = item.lastName + ', ' + item.firstName;
      });
    }
    return {
      getProfessor: function(value) {
        return $http.get($rootScope.domain + '/professor/find', {
          params: {
            id: value
          }
        }).then(function(result){
            return result.data;
          })
      },
      getNeedingReview: function(page){
        page = page || 1;
        return $http.get($rootScope.domain + '/professor/needingReview')
          .then(function(result) {
            addName(result.data);
            return result.data;
          })
      },
      getTopProfessors: function(page){
        page = page || 1;
        return $http.get($rootScope.domain + '/professor/best',{
          params: {
            page: page
          }
        })
          .then(function(result) {
            addName(result.data.profs);
            return result.data;
          })
      },
      findProfessor: function(value) {
        return $http.get($rootScope.domain + '/professor/json', {
          params:{
            name:value
          }
        }).then(function(result){
            addName(result.data);
            return result.data;
        })
      },
      createProfessor: function(value) {
        return $http.post($rootScope.domain + '/professor/create', {
          params: value
        })
          .then(function(result){
            return result.data;
        })
      }
    }
}])

.factory('reviewService', ['$rootScope', '$http', function($rootScope, $http) {
    return {
      reviewMax: 5,

      getReviews: function(prof_id, page, count) {
        return $http.get($rootScope.domain + '/review/paginate',{
          params: {
            professor_id: prof_id,
            page: page,
            count: count
          }
        })
          .then(function(result){
            var length = result.data.reviews.length;
            for(var i = 0; i < length; i++) {
              var data = result.data.reviews[i];
              var rating =
                [{title:'helpfulness', value: data.rating.helpfulness},
                 {title:'easiness', value: data.rating.easiness},
                  {title: 'pedagogy', value: data.rating.pedagogy}];
              data.rating = rating;
            }
            return result.data;
        })
      },

      createReview: function(value){
        return $http.post($rootScope.domain + '/review/create', {
          params:value
        })
          .then(function(result){
            return result.data;
          })
      },

      fieldDetails: {
        attendance: {
          field: 'attendance',
          details: 'Does the Professor keep attendance?'
        },
        rating:[
          {
            field: 'helpfulness',
            details: 'Is the professor approachable and easy to communicate with? ' +
              'Does he welcome inquiries during office hours or after class for additional help?',
            rate: {
              1: 'Professor is ill-tempered and always angry. Do not take if you are scared easily',
              2: 'Professor is grouchy and easily angered. Will half-heartedly help if you ask for help.',
              3: 'Professor is approachable and nice',
              4: 'Professor is quite approachable, and helps out whenever convenient',
              5: 'Professor is very nice, and actively seeks students who are having trouble with coursework'
            }
          },{
            field: 'pedagogy',
            details: 'How well is the class taught? ' +
              "Are the teaching methods aimed at educating the student or is the professor too lazy to teach? \n" +
              'Tip: A Class that is too easy should also constitute for bad pedagogy. (e.g. Prof. gives too much free points)',
            rate: {
              1: 'Class is impossible. Professor never teaches but simply complains about everything under the sun.',
              2: 'Class is poorly thought out. Professor is lazy. Students are made to memorize/copy out slides without further explanation on the subject matter.',
              3: 'Class is taught in a monotonous, boring, and unintellectual manner. Minimal explanation of concepts',
              4: 'Explanations are plentiful, and active learning is prioritized over passive learning.',
              5: 'Professor teaches complicated concepts intuitively, and frequently abstracts theories to understandable analogies.'
            }
          },{
            field: 'easiness',
            details: 'Is the class hard or Unoable?',
            rate: {
              1: 'Class is impossible. With bad pedagogy, class introduces concepts in an incredibly convuluted manner',
              2: 'Class is hard. Introduces high-level concepts that are difficult to grasp without proper background',
              3: 'Class is all right, Passable with enough effort.',
              4: 'Class borders on easy. Passable with minimal effort.',
              5: 'Unoable'
            }
          }]
      }
    }

      //rating: [{title:'helpfulness', value:4}, {title:'easiness', value:2}, {title:'clarity', value:1},
      //{title:'workload', value: 5}, {title:'interest', value:5}, {title:'grade', value:1}],
}])
