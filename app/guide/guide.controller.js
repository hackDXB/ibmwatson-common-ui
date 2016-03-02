'use strict';
(function () {

  angular
  .module('watson.common.ui.controllers', [])
  .controller('GuideController', ['$scope', '$uibModal', '$stateParams', guideController])
  .controller('BannerController', ['$scope', '$location', '$interval', bannerController])
  .controller('ModalController', modalController);

  function guideController($scope, $uibModal, $stateParams, $location) {
    var vm = this;

    vm.helpTemplate = "templates/help.html";

    vm.openModal = function() {
      $uibModal.open({
        animation: true,
        windowTemplateUrl: 'templates/modal.html',
        templateUrl: 'templates/modal-content.html',
        controller: 'ModalController',
        controllerAs: 'ctrl'
      })
    };
  }

  function bannerController($scope, $location, $interval) {
    var vm = this;

    var sections = ['banner', 'sidenav', 'headings', 'typography', 'glyphs', 'icons', 'forms', 'radio', 'checkboxes', 'search', 'filter', 'buttons', 'dropdowns', 'breadcrumb', 'modals', 'file', 'tables', 'tooltips', 'grids', 'accordian', 'labels', 'tags', 'progress', 'alerts'];

    vm.atLocation = function(location) {
      return $location.url().indexOf(location) > -1;
    }
    vm.atLocation = function(location) {
      return $location.url().indexOf(location) > -1;
    }
  }

  function modalController($scope, $uibModalInstance) {
    var vm = this;

    vm.ok = function () {
      $uibModalInstance.close('success');
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }

})();
