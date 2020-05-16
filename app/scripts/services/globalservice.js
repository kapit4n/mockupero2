"use strict";

/**
 * @ngdoc service
 * @name mockuperApp.globalService
 * @description
 * # GlobalService
 * Service in the mockuperApp.
 */
angular.module("mockuperApp").factory("GlobalService", [
  "$resource",
  "$cookies",
  function ($resource, $cookies) {
    var config = {};
    config.BASE_PATH = "http://localhost:8080";
    config.settings = $resource(
      config.BASE_PATH + "/GlobalSettings/getByUserId",
      {
        userId: "@userId",
      },
      {
        get: {
          method: "GET",
        },
      }
    );

    config.settingsSave = $resource(
      config.BASE_PATH + "/GlobalSettings/saveByUserId",
      {
        userId: "@userId",
        globalSettings: "@globalSettings",
      },
      {
        save: {
          method: "POST",
        },
      }
    );

    config.settingsValue = {};
    config.reloadSettings = function () {
      config.settings
        .get({
          userId: $cookies.get("userId"),
        })
        .$promise.then(function (result) {
          config.settingsValue = result;
        });
    };
    config.saveSettings = function () {
      config.settingsValue.userId = $cookies.get("userId");
      config.settingsSave
        .save({
          userId: $cookies.get("userId"),
          globalSettings: config.settingsValue,
        })
        .$promise.then(function (result) {
          config.settingsValue = result;
        });
    };
    config.reloadSettings();
    return config;
  },
]);
