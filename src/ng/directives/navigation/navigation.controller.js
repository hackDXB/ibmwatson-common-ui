/**
 * Copyright 2016 IBM Corp.
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
    .controller('NavigationController', NavigationController);

  NavigationController.$inject = ['$scope', '$location'];

  function NavigationController ($scope, $location) {
    var vm = this;

    vm.toggleMenu = toggleMenu;
    vm.location = location;
    vm.setCurrent = setCurrent;

    vm.sections = [];
    vm.footer = [];
    if ($scope.config) {
      vm.sections = $scope.config.sections;
      vm.footer = $scope.config.footer;
    }

    initializeLocation();

    function initializeLocation () {
      // Find current section from url
      var currentUrl = $location.url();
      for (var i = 0; i < vm.sections.length; i++) {
        var links = vm.sections[i].links;
        if (links) {
          for (var j = 0; j < links.length; j++) {
            if (links[j].href.indexOf(currentUrl) > -1) {
              setCurrent(vm.sections[i], links[j]);
              return;
            }
          }
        }
      }
    }

    function toggleMenu () {
      vm.menuOpen = !vm.menuOpen;
    }

    function setCurrent (section, link) {
      if (section) {
        vm.currentSection = section;
      }
      vm.currentLink = link;
    }
  }
}());
