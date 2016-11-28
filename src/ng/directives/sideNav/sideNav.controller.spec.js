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

describe('Controller: SideNavController', function testSideNavController () {

  var vm, scope, MOCKS;

  // load the directive's module and view
  beforeEach(module('watson.common.ui'));

  beforeEach(function () {
    inject(function ($controller, _$rootScope_) {
      MOCKS = {
        LOCATION : {
          url : sinon.stub().returns('abcdef')
        }
      };

      scope = _$rootScope_.$new();
      vm = $controller('SideNavController', {
        $scope : scope,
        $location : MOCKS.LOCATION
      });

      sinon.spy($.fn, 'removeClass');
      sinon.spy($.fn, 'toggleClass');
    });
  });

  afterEach(function () {
    $.fn.removeClass.restore();
    $.fn.toggleClass.restore();
  });

  describe('.toggleMenu', function () {
    it('should close side nav if it is open', function () {
      vm.sideNavOpen = true;

      vm.toggleMenu();

      vm.sideNavOpen.should.equal(false);
      $.fn.toggleClass.should.have.been.calledWith('side-nav-open');
    });

    it('should open side nav if it is closed', function () {
      vm.sideNavOpen = false;

      vm.toggleMenu();

      vm.sideNavOpen.should.equal(true);
      $.fn.toggleClass.should.have.been.calledWith('side-nav-open');
    });
  });

  describe('.location', function () {
    it('should return false if no href is given', function () {
      vm.location().should.equal(false);
    });

    it('should return true if the href is included in the url', function () {
      vm.location('abcdef').should.equal(true);
    });

    it('should return false if the href is not included in the url', function () {
      vm.location('a1b2c3').should.equal(false);
    });

    it('should return true if the href (with first char # removed) is included in the url', function () {
      vm.location('#abcdef').should.equal(true);
    });

    it('should return false if the href (with first char # removed) is not included in the url', function () {
      vm.location('#a1b2c3').should.equal(false);
    });
  });

  describe('onDestroy', function () {
    it('should remove the class from the body tag that indicated the side nav being open', function () {
      scope.$destroy();

      $.fn.removeClass.should.have.been.calledWith('side-nav-open');
    });
  });

});

