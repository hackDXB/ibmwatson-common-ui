'use strict';

describe('Directive: askWatson', function () {

  // load the directive's module and view
  beforeEach(module('watson.common.ui'));
  beforeEach(module('app/directives/askWatson/askWatson.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

});
