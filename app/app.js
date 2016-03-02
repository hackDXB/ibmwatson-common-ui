/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

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
  function appConfig($stateProvider, $urlRouterProvider) {

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
  };

})();
