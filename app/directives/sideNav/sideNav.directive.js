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
    .module('watson.common.ui')
    .directive('sideNav', sideNav);

  function sideNav() {
    return {
      restrict: 'E',
      templateUrl: 'directives/sideNav/sideNav.html',
      scope: {
        links: '='
      },
      controller: function($scope, $location) {
        this.toggleMenu = function() {
          this.sideNavOpen = !this.sideNavOpen;
          angular.element(document.body).toggleClass("side-nav-open");
        };
        this.location = function(href) {
          if(!href) return false;
          if(href.indexOf('#') == 0) href = href.substring(1);
          return $location.url().indexOf(href) > -1;
        };
      },
      controllerAs: 'ctrl'
    };
  };

})();
