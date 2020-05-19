"use strict";

/**
 * @ngdoc function
 * @name mockuperApp.controller:MockupNewCtrl
 * @description
 * # MockupNewCtrl
 * Controller of the mockuperApp
 */
angular.module("mockuperApp").controller("MockupNewCtrl", [
  "$rootScope",
  "$scope",
  "$window",
  "$routeParams",
  "mockupService",
  "projectService",
  "breadcrumbService",
  "headerService",
  function (
    $rootScope,
    $scope,
    $window,
    $routeParams,
    mockupService,
    projectService,
    breadcrumbService,
    headerService
  ) {
    headerService.updateHeader("projects");
    $scope.name = "";
    $scope.objType = "Mockup";
    $scope.newMockup = {};
    $scope.description = "";
    $scope.imgToShow = "";
    $scope.project = {};
    $scope.project.id = $routeParams.projectId;

    $scope.save = function (addObjectForm) {
      if (addObjectForm.$valid) {
        // $scope.newMockup.owner = $cookies.get("userId");
        $scope.newMockup.projectId = $routeParams.projectId;
        mockupService.createMockup.save(
          $scope.newMockup,
          function (result) {
            mockupService.publishCreate($scope, result);
            $window.location.href = "#!/mockup/" + result.id;
          },
          function (err) {
            $scope.err = err;
          }
        );
      }
    };

    projectService.projectById
      .get({ projectId: $routeParams.projectId })
      .$promise.then(function (result) {
        $scope.project = result;
        try {
          $rootScope.breadcrumb = breadcrumbService.updateBreadcrumb(
            "mockup-new",
            $scope.project
          );
          $rootScope.$digest();
        } catch (e) {}
      });

    $scope.cancel = function () {
      $window.location.href = "#!/project/" + $routeParams.projectId;
    };
  },
]);
