'use strict';

angular.module('washingMachine')
  .controller('SignupCtrl', function ($location, $scope, $http, $timeout) {

    var vm = this;
    $scope.notification_success = false;
    $scope.notification_duplicate = false;

    angular.extend(vm, {
      name: 'SignupCtrl',
      /**
       * User credentials
       */
      // user: { email: 'test@test.com', password: 'test' },

    });

    $scope.signup = function(user){

      if(!user.name){$scope.alert = "您未填入使用者名稱"}
      else if (!user.email){$scope.alert = "您未填入email"}
      else if (!user.password){$scope.alert = "您未填入密碼"}
      else if (!user.phone){$scope.alert = "您未填入電話"}
      else if (user.phone.length != 10){$scope.alert = "電話號碼錯誤"}
      else{
        $scope.alert = false;
        $http({
          method:'POST',
          url:'api/users',
          data: user
        }).success(function(res){
          if(res == "done"){
            $scope.notification_success = true;
            $timeout( directToLogin, 5000);
          }
          else if (res == "email already used!"){
            $scope.notification_duplicate = true;
            $location.path('/login');
          }
        });
      }
    };
    function directToLogin(){
      $location.path('/login');
    };

  });
