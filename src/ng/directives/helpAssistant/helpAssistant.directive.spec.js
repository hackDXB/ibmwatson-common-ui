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

describe('Directive: helpAssistant', function () {

  // load the directive's module and view
  beforeEach(module('watson.common.ui'));

  var element, scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();

    element = angular.element('<help-assistant></help-assistant>');

    scope.intent = { template : ''};

    element = $compile(element)(scope);

  }));

});
