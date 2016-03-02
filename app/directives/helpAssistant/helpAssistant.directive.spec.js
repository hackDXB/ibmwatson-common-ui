'use strict';

describe('Directive: helpAssistant', function () {

  // load the directive's module and view
  beforeEach(module('watson.common.ui'));
  beforeEach(module('app/directives/helpAssistant/helpAssistant.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

});
