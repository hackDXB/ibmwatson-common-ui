/**
 * Copyright 2016 IBM Corp.
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

module.exports = function (config) {
  config.set({
    // base path, that will be used to resolve files and exclude
    basePath : '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks : ['mocha', 'chai', 'sinon', 'sinon-chai'],

    // list of files / patterns to load in the browser
    files : [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/ng-tags-input/ng-tags-input.js',
      'src/ng/**/*.module.js',
      'src/ng/**/*.js',
      'src/ng/**/*.html'
    ],

    preprocessors : {
      'src/ng/**/*.html' : 'ng-html2js',
      'src/ng/**/!(*.spec|*.mock).js' : 'coverage'
    },

    ngHtml2JsPreprocessor : {
      moduleName : 'watson.common.ui.templates'
    },

    // list of files / patterns to exclude
    exclude : [],

    coverageReporter : {
      reporters : [
        {
          type : 'html',
          dir : 'coverage'
        },
        {
          type : 'text-summary'
        },
        {
          type : 'json',
          dir : 'coverage',
          subdir : './'
        }
      ]
    },

    reporters : ['progress', 'junit', 'coverage'],

    // web server port
    port : 8080,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel : config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch : false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers : ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun : false
  });
};
