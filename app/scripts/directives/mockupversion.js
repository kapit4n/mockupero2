'use strict';

/**
 * @ngdoc directive
 * @name mockuperApp.directive:mockupVersion
 * @description
 * # mockupVersion
 */
angular.module('mockuperApp')
    .directive('mockupVersion', ['$cookies', '$timeout', 'mockupVersionService', '$routeParams', 'GlobalService',
        function($cookies, $timeout, mockupVersionService, $routeParams, GlobalService) {
            return {
                templateUrl: 'views/templates/mockupVersion.html',
                restrict: 'E',
                link: function postLink(scope, element, attrs) {
                    scope.globalService = GlobalService;
                }
            };
        }
    ]);
