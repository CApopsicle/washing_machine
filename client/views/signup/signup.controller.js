'use strict';

angular.module('washingMachine')
  .controller('SignupCtrl', function ($location, $scope, $http) {

    var vm = this;

    angular.extend(vm, {
      name: 'SignupCtrl',
      /**
       * User credentials
       */
      // user: { email: 'test@test.com', password: 'test' },

      /**
       * Signup
       */
      // signup: function () {
      //   Auth.signup(vm.user)
      //     .then(function () {
      //       $location.path('/');
      //     })
      //     .catch(function (err) {
      //       vm.error = err;
      //     });
      // }
    });

    $scope.signup = function(user){

      $http({
        method:'POST',
        url:'api/users',
        data: user
      }).success(function(res){
        console.log(res);
      });
    };

  });
