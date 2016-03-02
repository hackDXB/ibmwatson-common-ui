'use strict';
(function () {

  angular
  .module('watson.common.ui')
  .directive('sideNav', sideNav);

  function sideNav() {
    return {
      restrict: 'E',
      templateUrl: 'directives/sideNav/sideNav.html',
      scope: {
        links: '='
      },
      controller: function($scope, $location) {
        this.toggleMenu = function() {
          this.sideNavOpen = !this.sideNavOpen;
          angular.element(document.body).toggleClass("side-nav-open");
        };
        this.location = function(href) {
          if(!href) return false;
          if(href.indexOf('#') == 0) href = href.substring(1);
          return $location.url().indexOf(href) > -1;
        };
      },
      controllerAs: 'ctrl'
    };
  }

})();
