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

describe('Directive: scrollToTop', function () {

  // load the directive's module
  beforeEach(module('watson.common.ui'));

  beforeEach(module('watson.common.ui.templates'));

  var scope, element, elementContainer, elementButton, windowElement,
      scope2, element2, elementContainer2, elementButton2, scrollerElement;

  beforeEach(inject(function ($rootScope, $compile, $window) {
    angular.element(document.body).append(angular.element(
      '<div id="scroller" style="height:200px; overflow:auto"><div style="height:2000px"></div></div>'));

    scope = $rootScope.$new();
    scope2 = $rootScope.$new();

    element = $compile('<div scroll-to-top></div>')(scope);
    element2 = $compile('<div scroll-to-top scroll-body="scroller"></div>')(scope2);

    scope.$apply();
    scope2.$apply();

    angular.element(document.body).append(element);
    angular.element(document.body).append(element2);

    scrollerElement = angular.element(document.getElementById('scroller'));
    windowElement = angular.element($window);

    elementContainer = angular.element(element[0].querySelector('#scroll-to-top-container'));
    elementContainer2 = angular.element(element2[0].querySelector('#scroll-to-top-container'));

    elementButton = angular.element(element[0].querySelector('#scroll-to-top-button'));
    elementButton2 = angular.element(element2[0].querySelector('#scroll-to-top-button'));
  }));

  it('should substitute the element', function () {
    element.should.not.be.null;
    element2.should.not.be.null;
  });

  describe('scroll event', function () {
    it('should add a hide class to the button if the scroll body is near the top', function () {
      elementContainer.hasClass('ng-hide').should.be.true;
      elementContainer2.hasClass('ng-hide').should.be.true;
      windowElement[0].scrollY = 200;
      scrollerElement[0].scrollTop = 200;
      scrollerElement.trigger('scroll');
      elementContainer.hasClass('ng-hide').should.be.false;
      elementContainer2.hasClass('ng-hide').should.be.false;
      windowElement[0].scrollY = 0;
      scrollerElement[0].scrollTop = 0;
      scrollerElement.trigger('scroll');
      elementContainer.hasClass('ng-hide').should.be.true;
      elementContainer2.hasClass('ng-hide').should.be.true;
    });

    it('should remove the hide class to the button if the scroll body is not near the top', function () {
      elementContainer.hasClass('ng-hide').should.be.true;
      elementContainer2.hasClass('ng-hide').should.be.true;
      windowElement[0].scrollY = 200;
      scrollerElement[0].scrollTop = 200;
      scrollerElement.trigger('scroll');
      elementContainer.hasClass('ng-hide').should.be.false;
      elementContainer2.hasClass('ng-hide').should.be.false;
    });
  });

  describe('click event on button', function () {
    it('should move to the top of the page on click', function () {
      windowElement[0].scrollY = 200;
      scrollerElement[0].scrollTop = 200;
      elementButton.trigger('click');
      elementButton2.trigger('click');
      windowElement[0].scrollY.should.equal(0);
      scrollerElement[0].scrollTop.should.equal(0);
    });
  });
});
