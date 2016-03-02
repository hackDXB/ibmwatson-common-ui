'use strict';
(function () {

  angular
  .module('watson.common.ui', [
    "ngAnimate",
    "ui.bootstrap",
    "ui.router",
    "watson.common.ui.controllers"
  ])
  .config(appConfig);


  // App config
  function appConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $urlRouterProvider
    .otherwise('/overview');

    $stateProvider
    .state('overview', {
      url: '/overview',
      templateUrl: 'guide/overview.html'
    })
    .state('elements', {
      url: '/elements',
      templateUrl: 'guide/elements.html'
    })
    .state('components', {
      url: '/components',
      templateUrl: 'guide/components.html',
      controller: 'GuideController',
      controllerAs: 'ctrl'
    })
    .state('layout', {
      url: '/layout',
      templateUrl: 'guide/layout.html'
    });
  }

})();
