'use strict';

angular.module('washingMachine')
  .directive('navBar', function (Auth) {
    return {
      restrict: 'E',
      templateUrl: 'directives/nav-bar/nav-bar.html',
      link: function($scope){
      	$scope.isLog = function(){
      		return Auth.isLogged();
      	};
      	$scope.logout = function(){
      		Auth.logout();
      	};
      	if( Auth.isLogged() ){
      		$scope.userName = Auth.getUser();
      	}
      }
    };
  });
