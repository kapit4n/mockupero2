'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.mockupService
 * @description
 * # mockupService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('mockupVersionService', ['$resource', '$cookies', '$routeParams', 'GlobalService',
        function($resource, $cookies, $routeParams, GlobalService) {
            // AngularJS will instantiate a singleton by calling "new" on this function
            var fac = {};

            fac.getMockupVersions = $resource(GlobalService.BASE_PATH + '/mockupVersions', {}, {
                get: {
                    method: 'GET',
                    isArray: true
                }
            });

            fac.versionMockupById = $resource(GlobalService.BASE_PATH + '/mockupVersions/:id', {
                id: '@id'
            }, {
                get: {
                    method: 'GET'
                }
            });

            fac.createMockupVersion = $resource(GlobalService.BASE_PATH + '/mockupVersions/', {}, {
                save: {
                    method: 'POST'
                }
            });

            fac.updateMockupVersion = $resource(GlobalService.BASE_PATH + '/mockupVersions/:id', {}, {
                update: {
                    method: 'PUT'
                }
            });

            fac.deleteMockupVersion = $resource(GlobalService.BASE_PATH + '/mockupVersions/:id', {}, {
                delete: {
                    method: 'DELETE'
                }
            });

            fac.mockupVersionRestore = $resource(GlobalService.BASE_PATH + '/mockupVersionRestore/', {}, {
                save: {
                    method: 'POST'
                }
            });

            fac.deleteMockupVersion = $resource(GlobalService.BASE_PATH + '/deleteMockupVersion/', {}, {
                save: {
                    method: 'POST'
                }
            });

            return fac;
        }
    ]);
