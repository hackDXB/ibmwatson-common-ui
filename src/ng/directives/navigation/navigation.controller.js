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


  var DEFAULT_TRANSLATIONS = {
    'LOADING' : 'Loading',
    'DETAILS' : 'Details',
    'CLOSE' : 'Close'
  };

  var DEFAULT_ICONS = {
    'MENU' : '#ibm-icon--menu_24',
    'CLOSE' : '#ibm-icon--close_cancel_24'
  };

  NavigationController.$inject = ['$scope', '$location', '$q'];

  function NavigationController ($scope, $location, $q) {
    var vm = this;

    vm.toggleMenu = toggleMenu;
    vm.location = location;
    vm.setCurrent = setCurrent;
    vm.toggleDetails = toggleDetails;

    vm.showTabs = true;
    vm.sections = [];
    vm.footer = [];
    vm.icons = DEFAULT_ICONS;
    vm.translations = DEFAULT_TRANSLATIONS;

    vm.loading = true;

    $scope.$watch('config', function (config, oldConfig) {
      vm.loading = config && typeof config.then === 'function';
      $q.when(config, setup, handleRejection);
    });

    $scope.$on('$locationChangeSuccess', function () {
      if (vm.sections) {
        initializeLocation(vm.sections);
      }
    });

    function initializeLocation (sections) {
      // Find current section from path e.g. /elements
      var currentUrl = $location.path();
      for (var i = 0; i < sections.length; i++) {
        var links = sections[i].links;
        if (links) {
          for (var j = 0; j < links.length; j++) {
            if (links[j].href.indexOf(currentUrl) > -1) {
              setCurrent(sections[i], links[j]);
              return;
            }
          }
        }
      }
    }


    function setup (config) {

      if (config) {
        vm.label = config.label;
        vm.showTabs = !(config.showTabs === false);
        vm.footer = config.footer;
        vm.translations = angular.extend({}, DEFAULT_TRANSLATIONS, config.translations || {});
        vm.icons = angular.extend({}, DEFAULT_ICONS, config.icons || {});

        // If sections are a promise, loading in progress
        vm.loading = config.sections && typeof config.sections.then === 'function';
        $q.when(config.sections, setupSections, handleRejection);

      } else {
        vm.loading = false;
      }

    }


    function setupSections (sections) {
      vm.sections = sections;
      initializeLocation(sections);
      vm.loading = false;
    }


    function handleRejection () {
      vm.loading = false;
    }


    function toggleMenu (open) {
      if (open === true || open === false) {
        vm.menuOpen = open;
      } else {
        vm.menuOpen = !vm.menuOpen;
      }
    }


    function setCurrent (section, link) {
      if (section) {
        vm.currentSection = section;
      }
      vm.currentLink = link;
    }


    function toggleDetails (link) {
      if (link.detailsOpen) {
        link.detailsOpen = false;
      } else {
        link.detailsOpen = true;
      }
    }

  }
}());
