'use strict';

/**
 * @ngdoc service
 * @name mockuperApp.workflowService
 * @description
 * # workflowService
 * Service in the mockuperApp.
 */
angular.module('mockuperApp')
    .service('workflowService', function($resource, GlobalService) {
        var fac = {};
        fac.workflow = $resource(GlobalService.BASE_PATH + '/workflows', {}, {
            get: {
                method: 'GET',
                isArray: true
            }
        });

        fac.createWorkflow = $resource(GlobalService.BASE_PATH + '/workflows/', {}, {
            save: {
                method: 'POST'
            }
        });

        fac.updateWorkflow = $resource(GlobalService.BASE_PATH + '/workflows/:id', {}, {
            save: {
                method: 'PUT'
            }
        });

        fac.workflowById = $resource(GlobalService.BASE_PATH + '/workflows/:id', {
            workflowId: '@id'
        }, {
            get: {
                method: 'GET'
            }
        });

        fac.deleteWorkflow = $resource(GlobalService.BASE_PATH + '/workflows/:id', {}, {
            delete: {
                method: 'DELETE'
            }
        });
        return fac;
    });
