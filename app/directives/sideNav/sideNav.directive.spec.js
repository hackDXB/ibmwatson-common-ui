'use strict';

describe('Directive: sideNav', function () {

  // load the directive's module and view
  beforeEach(module('watson.common.ui'));
  beforeEach(module('app/directives/sideNav/sideNav.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

});
