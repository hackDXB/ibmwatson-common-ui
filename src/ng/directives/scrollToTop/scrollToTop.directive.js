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
    .directive('scrollToTop', scrollToTop);


  function scrollToTop ($window) {
    return {
      restrict : 'A',
      templateUrl : 'directives/scrollToTop/scrollToTop.html',
      link : function (scope, element, attributes) {
        var container = angular.element(element[0].querySelector('#scroll-to-top-container'));
        var useWindow = false;

        var scrollBody = angular.element(document.getElementById(attributes.scrollBody));
        if (!scrollBody.length) {
          scrollBody = angular.element($window);
          useWindow = true;
        }

        scrollBody.bind('scroll', function () {
          var scrollValue = (useWindow ? this.scrollY : this.scrollTop);
          if (scrollValue >= 100) {
            container.removeClass('ng-hide');
          } else {
            container.addClass('ng-hide');
          }
          scope.$apply();
        });

        var button = angular.element(element[0].querySelector('#scroll-to-top-button'));
        button.bind('click', function () {
          if (useWindow) {
            scrollBody[0].scrollY = 0;
          } else {
            scrollBody[0].scrollTop = 0;
          }
        });
      }
    };
  }

})();
