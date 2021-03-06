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

describe('Directive: sideNav', function () {

  // load the directive's module and view
  beforeEach(module('watson.common.ui'));

  var element, scope;

  beforeEach(inject(function ($rootScope, $compile) {
    scope = $rootScope.$new();

    element = $compile('<side-nav></side-nav>')(scope);
  }));

  it('should substitute the element', function () {

    element.should.not.be.null;

  });

});
