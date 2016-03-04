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
  .controller('GuideController', ['$scope', '$uibModal', guideController])
  .controller('BannerController', ['$scope', '$location', bannerController])
  .controller('ModalController', modalController);


  function guideController ($scope, $uibModal) {
    var vm = this;

    vm.helpTemplate = "templates/help.html";

    vm.openModal = function() {
      $uibModal.open({
        animation: true,
        windowTemplateUrl: 'templates/modal.html',
        templateUrl: 'templates/modal-content.html',
        controller: 'ModalController',
        controllerAs: 'vm'
      });
    };
  };

  function bannerController ($scope, $location) {
    var vm = this;

    var sections = ['banner', 'sidenav', 'headings', 'typography', 'glyphs', 'icons', 'forms', 'radio', 'checkboxes', 'search', 'filter', 'buttons', 'dropdowns', 'breadcrumb', 'modals', 'file', 'tables', 'tooltips', 'grids', 'accordian', 'labels', 'tags', 'progress', 'alerts'];

    vm.atLocation = function(location) {
      return $location.url().indexOf(location) > -1;
    };
    vm.atLocation = function(location) {
      return $location.url().indexOf(location) > -1;
    };
  };

  function modalController ($scope, $uibModalInstance) {
    var vm = this;

    vm.ok = function () {
      $uibModalInstance.close('success');
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  };

})();
