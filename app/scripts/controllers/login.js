'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'loginService', '$cookies',
        function($rootScope, $scope, $location, loginService, $cookies) {
            $scope.userName = '';
            $scope.identifier = '';
            $scope.password = '';
            $scope.userInfo = {};
            $scope.singIn = function() {
                var identifier = {
                    "email": $scope.identifier,
                    "password": $scope.password
                };
                loginService.loginUser.save(identifier).$promise.then(function(result) {
                    console.log(result);
                    console.log("LoginCtrl");
                    $rootScope.isAuthenticated = true;
                    $rootScope.userNameLogin = result.user.email;
                    $rootScope.email = result.user.email;

                    $cookies.put('userId', result.user.id);
                    $cookies.put('username', result.user.email);
                    $cookies.put('email', result.user.email);
                    $rootScope.isAuthenticated = true;
                    $location.path("/");
                }, function(reason) {
                    console.log(reason); // Error!
                });
            };
        }
    ]);
