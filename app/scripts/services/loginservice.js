"use strict";

/**
 * @ngdoc service
 * @name mockuperApp.loginService
 * @description
 * # loginService
 * Service in the mockuperApp.
 */
angular.module("mockuperApp").service("loginService", [
  "$resource",
  "$rootScope",
  "$cookies",
  "$location",
  "$window",
  "userService",
  "GlobalService",
  function (
    $resource,
    $rootScope,
    $cookies,
    $location,
    $window,
    userService,
    GlobalService
  ) {
    var fac = {};

    $rootScope.logoutUser = function () {
      io.socket.post(
        "/loginlog/logout",
        { username: $cookies.get("username") },
        function serverResponded(body, JWR) {
          console.log("Logout User Success " + body);
        }
      );
      $cookies.remove("username");
      $cookies.remove("userId");
      $cookies.put("sails.sid", "XX");
      $cookies.remove("email");
      $rootScope.isAuthenticated = false;
      $location.path("/login");
      $window.location.reload();
    };

    fac.loginUser = $resource(
      GlobalService.BASE_PATH + "/login",
      {},
      {
        save: {
          method: "POST",
        },
      }
    );

    fac.loginLog = $resource(
      GlobalService.BASE_PATH + "/loginlog",
      {},
      {
        save: {
          method: "POST",
        },
      }
    );

    fac.loginLogLogin = $resource(
      GlobalService.BASE_PATH + "/loginlog/login",
      {},
      {
        save: {
          method: "POST",
        },
      }
    );

    fac.registerUser = function (username, token) {
      $rootScope.globals = {
        currentUser: {
          username: username,
          tokeb: token,
        },
      };
    };

    fac.reloadScope = function () {
     /*  if ($cookies.get("userId")) {
        userService.userById
          .get({
            userId: $cookies.get("userId"),
          })
          .$promise.then(function (err, result) {
            $rootScope.isAuthenticated = true;
            $rootScope.userNameLogin = $cookies.get("username");
            $rootScope.userId = $cookies.get("userId");
          });
      } else {
        $location.path("/login");
      } */
    };

    return fac;
  },
]);
