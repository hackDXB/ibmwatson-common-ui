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

    vm.showHelp = function () {
      vm.helpVisible = !vm.helpVisible;
    };

    vm.openModal = function () {
      $uibModal.open({
        animation : true,
        windowTemplateUrl : 'templates/modal.html',
        templateUrl : 'templates/modal-content.html',
        controller : 'ModalController',
        controllerAs : 'vm'
      });
    };

    vm.inputTagModel = [{'text' : 'Tag1'}, {'text' : 'Tag2'}, {'text' : 'Tag3'}, {'text' : 'a really long tag name with lots of characters'}];
    vm.inputTagModelReadOnly = [{'text' : 'Tag1'}, {'text' : 'Tag2'}, {'text' : 'Tag3'}, {'text' : 'a really long tag name with lots of characters'}];

    vm.toggle = {};
    vm.toggle.switchModel = false;
    vm.toggle.singleModel = false;
    vm.toggle.checkModel = {'left' : false, 'middle' : false, 'right' : false};
    vm.toggle.radioModel = 'Left';


    vm.popover = {
      content : 'Some help text',
      title : 'Tooltip Title',
      placement : {
        options : [
          'top',
          'top-left',
          'top-right',
          'bottom',
          'bottom-left',
          'bottom-right',
          'left',
          'left-top',
          'left-bottom',
          'right',
          'right-top',
          'right-bottom'
        ],
        selected : 'top'
      }
    };

    vm.buttonGroup = {
      buttons : [
        {
          label : 'Button 1'
        }, {
          label : 'Button 2'
        }, {
          label : 'Button 3',
          disabled : true
        }, {
          label : 'Button 4'
        }
      ]
    };
  }

  function bannerController ($scope, $location) {
    var vm = this;

    vm.navConfig = {
      'label' : 'Menu',
      'icons' : {
        'MENU' : 'icons/sprite/ibm-icons.svg#ibm-icon--menu_24',
        'CLOSE' : 'icons/sprite/ibm-icons.svg#ibm-icon--close_cancel_24'
      },
      'sections' : [
        {
          'label' : 'Back somewhere',
          'icon' : 'icons/sprite/ibm-icons.svg#ibm-icon--go_back_24',
          'href' : '#/overview'
        }, {
          'label' : 'Main',
          'icon' : 'icons/sprite/ibm-icons.svg#ibm-icon--home_24',
          'links' : [
            {
              'label' : 'Overview',
              'href' : '#/overview'
            }, {
              'label' : 'Elements',
              'href' : '#/elements',
            }, {
              'label' : 'Components',
              'href' : '#/components',
            }
          ]
        }, {
          'label' : 'Other',
          'icon' : 'icons/sprite/ibm-icons.svg#ibm-icon--workspace_24',
          'links' : [
            {
              'label' : 'Layout',
              'href' : '#/layout',
              'details' : [
                'A collection of layout styles'
              ]
            }
          ]
        }
      ],
      'footer' : {
        'links' : [
          {
            'label' : 'Settings',
            'href' : '#/overview',
            'icon' : 'icons/sprite/ibm-icons.svg#ibm-icon--settings_24'
          }, {
            'label' : 'Log out',
            'href' : '#/overview',
            'icon' : 'icons/sprite/ibm-icons.svg#ibm-icon--log_out_24'
          }
        ]
      }
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
