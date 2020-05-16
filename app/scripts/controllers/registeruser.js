'use strict';

/**
 * @ngdoc function
 * @name mockuperApp.controller:RegisteruserCtrl
 * @description
 * # RegisteruserCtrl
 * Controller of the mockuperApp
 */
angular.module('mockuperApp')
    .controller('RegisteruserCtrl', ['$scope', 'userService', 'projectService', '$routeParams', '$location', '$rootScope', 'headerService', 'breadcrumbService',
        function($scope, userService, projectService, $routeParams, $location, $rootScope, headerService, breadcrumbService) {
            headerService.updateHeader('users');
            $scope.username = '';
            $scope.email = '';
            $scope.password = '';
            $scope.password_confirm = '';
            $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb('user-list', 'user');
            $scope.registerUserSave = function(registerForm) {
                if (registerForm.$valid) {
                    userService.createUser.save({
                        userName: $scope.userName,
                        email: $scope.email,
                        password: $scope.password,
                        name: $scope.username,
                    }, function(result) {
                        userService.publishCreate($scope, result);
                        $location.path('/userlist');
                    }, function(err) {
                        $scope.err = err;
                    });
                }
            };
        }
    ]);
