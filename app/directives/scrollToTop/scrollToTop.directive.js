'use strict';
(function () {

  angular
  .module('watson.common.ui')
  .directive('scrollToTop', scrollToTop);


  function scrollToTop($window, $filter) {
    return {
      restrict: 'A',
      templateUrl: 'directives/scrollToTop/scrollToTop.html',
      link: function (scope, element, attributes) {
        var container = angular.element(document.getElementById('scroll-to-top-container'));
        angular.element($window).bind("scroll", function() {
          if (this.pageYOffset >= 100) {
            container.removeClass("ng-hide");
          } else {
            container.addClass("ng-hide");
          }
          scope.$apply();
        });

        var button = angular.element(document.getElementById('scroll-to-top-button'));
        button.bind('click', function() {
          $window.scrollTo(0, 0);
        });
      }
    }
  };

})();
