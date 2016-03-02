'use strict';
(function () {

  angular
  .module('watson.common.ui')
  .directive('askWatson', sideNav);

  function sideNav() {
    return {
      restrict: 'E',
      templateUrl: 'directives/askWatson/askWatson.html',
      scope: {
        links: '='
      },
      controller: function($scope, $location) {
        this.conversation = [
          {
            who: "user",
            message: "Where is the bathroom?",
            intents: [],
            date: "Today, 4:58pm"
          },
          {
            who: "watson",
            message: "Sorry, I don't know",
            intents: [],
            date: "Today, 4:58pm"
          }
        ];

        this.toggleMenu = function() {
          this.isOpen = !this.isOpen;
          angular.element(document.body).toggleClass("ask-watson-open");
        };
      },
      controllerAs: 'ctrl'
    };
  }

})();
