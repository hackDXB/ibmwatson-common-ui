'use strict';
(function () {

    angular
        .module('watson.common.ui', [
                "ngAnimate",
                "ui.bootstrap",
                "ui.router",
                "watson.common.ui.controllers"
        ])
        .config(appConfig);

    angular
        .module('watson.common.ui.controllers', [])
        .controller('BannerController', ['$scope', '$location', bannerController])
        .controller('GuideController', ['$scope', '$uibModal', '$stateParams', guideController])
        .controller('ModalController', modalController);


    // App config
    function appConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

        $urlRouterProvider
          .otherwise('/overview');

        $stateProvider
            .state('overview', {
                url: '/overview',
                templateUrl: 'overview/overview.html',
                controller: 'GuideController'
            })
            .state('guide', {
                url: '/guide/:section',
                templateUrl: 'guide/guide.html',
                controller: 'GuideController'
            });
    }

    // Controllers
    function bannerController($scope, $location) {
        this.atLocation = function(location) {
            return $location.url().indexOf(location) > -1;
        }
        $scope.atLocation = function(location) {
            return $location.url().indexOf(location) > -1;
        }
    }

    function guideController($scope, $uibModal, $stateParams) {

        $scope.disableAnimations = function() {
            angular.element(document.body).addClass('no-animation');
        }

        $scope.$on('$viewContentLoaded', function(event){
            setTimeout(function(){angular.element(document.body).removeClass('no-animation')}, 0);
            var element = document.getElementById($stateParams.section);
            if(element) element.scrollIntoView(true);
        });

        this.openModal = function() {
            $uibModal.open({
                animation: true,
                windowTemplateUrl: 'templates/modal.html',
                templateUrl: 'templates/modal-content.html',
                controller: 'ModalController'
            })
        };
    }

    function modalController($scope, $uibModalInstance) {
        $scope.ok = function () {
            $uibModalInstance.close('success');
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();
