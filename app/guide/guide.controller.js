/**
 * Copyright 2015 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
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

    vm.helpTemplate = 'templates/help.html';

    vm.openModal = function () {
      $uibModal.open({
        animation : true,
        windowTemplateUrl : 'templates/modal.html',
        templateUrl : 'templates/modal-content.html',
        controller : 'ModalController',
        controllerAs : 'vm'
      });
    };

    vm.showHelp = function () {
      vm.helpVisible = !vm.helpVisible;
    };

    vm.inputTagModel = [{'text' : 'Tag1'}, {'text' : 'Tag2'}, {'text' : 'Tag3'}, {'text' : 'a really long tag name with lots of characters'}];
    vm.inputTagModelReadOnly = [{'text' : 'Tag1'}, {'text' : 'Tag2'}, {'text' : 'Tag3'}, {'text' : 'a really long tag name with lots of characters'}];

    vm.toggle = {};
    vm.toggle.switchModel = false;
    vm.toggle.singleModel = false;
    vm.toggle.checkModel = {'left' : false, 'middle' : false, 'right' : false};
    vm.toggle.radioModel = 'Left';
  }

  function bannerController ($scope, $location) {
    var vm = this;

    vm.navConfig = {
      'label' : 'Menu',
      'sections' : [
        {
          'label' : 'Back somewhere',
          'icon' : 'ibm-glyph--next-right-forward_24 rotate-180',
          'href' : '#/overview'
        },
        {
          'label' : 'Main',
          'icon' : 'ibm-icon--home',
          'links' : [
            {
              'label' : 'Overview',
              'href' : '#/overview',
              'icon' : 'ibm-icon--home'
            },
            {
              'label' : 'Elements',
              'href' : '#/elements',
              'icon' : 'ibm-icon--code'
            },
            {
              'label' : 'Components',
              'href' : '#/components',
              'icon' : 'ibm-icon--spaces'
            }
          ]
        },
        {
          'label' : 'Other',
          'icon' : 'ibm-icon--spaces',
          'links' : [
            {
              'label' : 'Layout',
              'href' : '#/layout',
              'icon' : 'ibm-icon--spaces'
            }
          ]
        }
      ],
      'footer' : {
        'links' : [
          {
            'label' : 'Settings',
            'href' : '#/overview',
            'icon' : 'ibm-icon--settings-manage'
          },
          {
            'label' : 'Log out',
            'href' : '#/overview',
            'icon' : 'ibm-icon--insert'
          }
        ]
      }
    };

    vm.atLocation = function (location) {
      return $location.url().indexOf(location) > -1;
    };

    vm.atLocation = function (location) {
      return $location.url().indexOf(location) > -1;
    };

    vm.toggleTheme = function () {
      angular.element(document.getElementById('theme-container')).toggleClass('dark-theme');
    };
  }

  function modalController ($scope, $uibModalInstance) {
    var vm = this;

    vm.ok = function () {
      $uibModalInstance.close('success');
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

})();
