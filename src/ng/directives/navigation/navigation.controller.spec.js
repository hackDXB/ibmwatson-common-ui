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

describe('Controller: WorkspaceController', function testWorkspaceController () {

  var vm, $scope, TEST_DATA, MOCKS;

  MOCKS = {
    LOCATION : {
      url : function () {
        return '/elements';
      }
    }
  };

  TEST_DATA = {
    CONFIG : {
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
    }
  };

  // load the controller's module
  beforeEach(function () {
    module('watson.common.ui');

    inject(function ($injector, $controller, _$rootScope_) {
      $scope = _$rootScope_.$new();
      $scope.config = TEST_DATA.CONFIG;

      vm = $controller('NavigationController', {
        $scope : $scope,
        $location : MOCKS.LOCATION
      });
    });
  });

  describe('.toggleMenu', function () {
    it('should toggle the menu', function () {
      vm.toggleMenu();
      vm.menuOpen.should.equal(true);
      vm.toggleMenu();
      vm.menuOpen.should.equal(false);
    });

    it('should close the menu', function () {
      vm.toggleMenu(false);
      vm.menuOpen.should.equal(false);
    });

    it('should open the menu', function () {
      vm.toggleMenu(true);
      vm.toggleMenu(true);
      vm.menuOpen.should.equal(true);
    });
  });

  describe('.setCurrent', function () {
    it('should set the current link', function () {
      var section = {'label' : 'section'};
      var link = {'label' : 'link'};
      vm.setCurrent(section, link);
      vm.currentSection.should.equal(section);
      vm.currentLink.should.equal(link);
    });

    it('should not set null section', function () {
      var section = {'label' : 'section'};
      var link = {'label' : 'link'};
      vm.setCurrent(section, link);
      vm.currentSection.should.equal(section);
      vm.currentLink.should.equal(link);
      vm.setCurrent(null, null);
      vm.currentSection.should.equal(section);
      should.not.exist(vm.currentLink);
    });
  });
});
