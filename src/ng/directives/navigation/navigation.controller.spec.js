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

  var vm, $scope, $q, TEST_DATA, MOCKS;

  beforeEach(function () {

    MOCKS = {
      LOCATION : {
        path : function () {
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

  });

  describe('Config as object', function () {

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

    describe('.toggleDetails', function () {
      it('should set detailsOpen to true', function () {
        var link = {'label' : 'link', 'details' : ['one', 'two', 'three']};
        vm.toggleDetails(link);
        link.detailsOpen.should.be.true;
      });

      it('should set detailsOpen to false', function () {
        var link = {'label' : 'link', 'details' : ['one', 'two', 'three'], 'detailsOpen' : true};
        vm.toggleDetails(link);
        link.detailsOpen.should.be.false;
      });
    });

    describe('locationChange', function () {
      it('should track location url changes', function () {
        should.not.exist(vm.currentLink);
        $scope.$emit('$locationChangeSuccess');
        $scope.$apply();
        // Note MOCKS.LOCATION addresses 'Elements'
        should.exist(vm.currentLink);
        vm.currentLink.label.should.equal('Elements');
      });
    });

  });

  describe('sections as promise', function () {
    // load the controller's module
    beforeEach(function () {
      module('watson.common.ui');

      inject(function ($injector, $controller, _$rootScope_, _$q_) {
        $q = _$q_;

        $scope = _$rootScope_.$new();

        this.configPromise = $q.defer();

        $scope.config = this.configPromise.promise;

        vm = $controller('NavigationController', {
          $scope : $scope,
          $location : MOCKS.LOCATION
        });
      });
    });

    it('should setup the navigation links once the config is resolved', function () {
      vm.should.not.have.a.property('label');
      vm.sections.length.should.equal(0);
      vm.loading.should.be.true;

      this.configPromise.resolve(TEST_DATA.CONFIG);
      $scope.$apply();

      vm.loading.should.be.false;
      vm.label.should.equal(TEST_DATA.CONFIG.label);
      vm.sections.length.should.equal(TEST_DATA.CONFIG.sections.length);

    });

    it('should remove the loading indicator if the promise is rejected', function () {
      vm.should.not.have.a.property('label');
      vm.sections.length.should.equal(0);
      vm.loading.should.be.true;

      this.configPromise.reject(new Error());
      $scope.$apply();

      vm.should.not.have.a.property('label');
      vm.sections.length.should.equal(0);
      vm.loading.should.be.false;

    });

  });

  describe('sections as promise', function () {
    // load the controller's module
    beforeEach(function () {
      module('watson.common.ui');

      inject(function ($injector, $controller, _$rootScope_, _$q_) {
        $q = _$q_;

        $scope = _$rootScope_.$new();

        this.sections = TEST_DATA.CONFIG.sections;
        this.sectionPromise = $q.defer();

        TEST_DATA.CONFIG.sections = this.sectionPromise.promise;

        $scope.config = TEST_DATA.CONFIG;

        vm = $controller('NavigationController', {
          $scope : $scope,
          $location : MOCKS.LOCATION
        });
      });
    });

    it('should setup the navigation links once the config is resolved', function () {

      vm.should.not.have.a.property('label');
      vm.sections.length.should.equal(0);
      vm.loading.should.be.true;

      $scope.$apply();

      vm.label.should.equal(TEST_DATA.CONFIG.label);
      vm.sections.length.should.equal(0);
      vm.loading.should.be.true;

      this.sectionPromise.resolve(this.sections);
      $scope.$apply();

      vm.loading.should.be.false;
      vm.sections.length.should.equal(this.sections.length);

    });

    it('should remove the loading indicator if the promise is rejected', function () {

      vm.should.not.have.a.property('label');
      vm.sections.length.should.equal(0);
      vm.loading.should.be.true;

      $scope.$apply();

      vm.label.should.equal(TEST_DATA.CONFIG.label);
      vm.sections.length.should.equal(0);
      vm.loading.should.be.true;

      this.sectionPromise.reject(new Error());
      $scope.$apply();

      vm.loading.should.be.false;
      vm.sections.length.should.equal(0);

    });


  });



});
