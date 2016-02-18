'use strict';

angular.module('washingMachine')
  .controller('LoginCtrl',function ($location, $scope, $http, $cookieStore, Auth) {

    var vm = this;
    var currentUser = {};

    angular.extend(vm, {

      name: 'LoginCtrl',

      /**
       * User credentials
       */
      // user: { email: 'test@test.com', password: 'test' },

      /**
       * Login method
       */
    });
    $scope.login = function (user) {
      Auth.login(vm.user)
        .then(function (result) {
          
          if(result == false){
            $scope.notSuccess = true;
            setTimeout(function(){ location.reload(); }, 3000);
          }
          else{
            $location.path('/');
          }
          
          // $location.path('/');
        })
        .catch(function (err) {
          vm.error = err;
        });


      // $http({
      //   method:'POST',
      //   url:'api/users/me',
      //   data: user
      // }).success(function(res){
      //   if(res){
      //     $cookieStore.put('isLoggedIn', res);
      //   }
      //   else{
      //     $scope.notSuccess = true;
      //     setTimeout(function(){ location.reload(); }, 3000);
      //   }
      //   console.log(res);
      // });

    };

    

  });
