/**
 * Copyright IBM Corp. 2016
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
    .controller('SideNavController', SideNavController);

  SideNavController.$inject = ['$scope', '$location'];

  function SideNavController ($scope, $location) {
    var vm = this;

    vm.toggleMenu = function () {
      vm.sideNavOpen = !vm.sideNavOpen;
      angular.element(document.body).toggleClass('side-nav-open');
    };

    vm.location = function (href) {
      if (!href) {
        return false;
      }
      if (href.indexOf('#') == 0) {
        href = href.substring(1);
      }
      return $location.url().indexOf(href) > -1;
    };

    $scope.$on('$destroy', function () {
      angular.element(document.body).removeClass('side-nav-open');
    });
  }
}());
