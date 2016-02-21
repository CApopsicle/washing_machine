'use strict';

angular.module('washingMachine')
  .service('Auth', function ($rootScope, $cookieStore, $http, $q) {

    var _user = {};
    var _ready = $q.defer();
    if ($cookieStore.get('isLoggedIn')){
      var email = $cookieStore.get('isLoggedIn');
      $http.get("api/users/me?email=" + email)
        .then(function(res){
          console.log(res);
          _user.data = true;
          _user.name = res.data.userName;
          _ready.resolve();
        });
      
    }
    else{
      _user = {};
      _ready.resolve();
    }
    /**
     * Signup
     *
     * @param user
     * @returns {promise}
     */
    // this.signup = function (user) {
    //   var deferred = $q.defer();
    //   $http.post('/api/users', user)
    //     .then(function (res) {
    //       _user = res.data.user;
    //       $cookieStore.put('token', res.data.token);
    //       deferred.resolve();
    //     })
    //     .catch(function (err) {
    //       deferred.reject(err.data);
    //     });
    //   return deferred.promise;
    // };

    /**
     * Login
     *
     * @param user
     * @returns {promise}
     */
    this.login = function (user) {
      var deferred = $q.defer();
      $http.post('api/users/login', user)
        .then(function (res) {
          console.log(res);
          if(res.data){
            _user.data = true;
            _user.name = user.name;
            $cookieStore.put('isLoggedIn', res.data.userEmail);
            deferred.resolve(res.data.userName);
          }
          else{
            _user = {};
            deferred.resolve(false);
          }  
        })
        .catch(function (err) {
          deferred.reject(err.data);
        });
      return deferred.promise;

    };

    /**
     * Logout
     */
    this.logout = function () {
      $cookieStore.remove('isLoggedIn');
      _user = {};
    };

    /**
     * Check if the user is logged
     *
     * @returns {boolean}
     */
    this.isLogged = function () {
      return _user.hasOwnProperty('data');
    };

    /**
     * Check if the user is logged after the ready state
     *
     * @returns {Promise}
     */
    // this.isReadyLogged = function () {
    //   var def = $q.defer();
    //   _ready.promise.then(function () {
    //     if (_user.hasOwnProperty('_id')) {
    //       def.resolve();
    //     } else {
    //       def.reject();
    //     }
    //   });
    //   return def.promise;
    // };

    /**
     * Returns the user
     *
     * @returns {object}
     */
    this.getUser = function () {
      return _user.name;
    };

  });
