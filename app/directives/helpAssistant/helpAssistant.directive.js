'use strict';
(function () {

  angular
  .module('watson.common.ui')
  .directive('helpAssistant', helpAssistant);

  function helpAssistant() {
    return {
      restrict: 'E',
      templateUrl: 'directives/helpAssistant/helpAssistant.html',
      scope: {
        template: '='
      },
      controller: function($scope, $location) {
        
      },
      controllerAs: 'ctrl'
    };
  }

})();
