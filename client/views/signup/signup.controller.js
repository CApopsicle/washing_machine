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

      if(!user.name){$scope.alert = "您未填入使用者名稱"}
      else if (!user.userID){$scope.alert = "您未填入使用者帳號"}
      else if (!user.email){$scope.alert = "您未填入email"}
      else if (!user.password){$scope.alert = "您未填入密碼"}
      else if (!user.phone){$scope.alert = "您未填入電話"}
      else{
        $http({
          method:'POST',
          url:'api/users',
          data: user
        }).success(function(res){
          console.log(res);
        });
      }
    };

  });
