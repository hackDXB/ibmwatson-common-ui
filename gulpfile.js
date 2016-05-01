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

var gulp = require('gulp');
var del = require('del');
var express = require('express');
var karma = require('karma');
var merge = require('merge-stream');
var streamqueue = require('streamqueue');

// Load gulp plugins
var plugins = require('gulp-load-plugins')({
  rename : {
    'gulp-angular-templatecache' : 'templateCache',
    'gulp-util' : 'gutil'
  }
});

// All tasks should use the gulp plumber plugin with this error
// handler, otherwise pipes break when there are errors
function handleError (err) {
  plugins.gutil.log(plugins.gutil.colors.red(err));
  this.emit('end');
}

var srcFolder = './src';
var srcPaths = {
  demo : ['./app/**/*'],
  fonts : [srcFolder + '/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}'],
  images : [srcFolder + '/assets/images/**/*.{png,ico,jpg,gif,svg}'],
  scripts : [
    srcFolder + '/ng/**/*.js',
    '!/**/*.spec.js'
  ],
  tests : [
    srcFolder + '/ng/**/*.{spec,mock}.js'
  ],
  rootStyles : [srcFolder + '/assets/styles/ibmwatson.scss'],
  styles : [srcFolder + '/assets/styles/**/*.scss'],
  templates : [srcFolder + '/ng/**/*.html']
};

var distFolder = './dist';
var destPaths = {
  fonts : distFolder + '/fonts',
  images : distFolder + '/images',
  styles : distFolder + '/styles',
  scripts : distFolder + '/js'
};

var publicFolder = './public';

var coverageFolder = './coverage';

// Clean

function cleanTask () {
  return del([distFolder, publicFolder, coverageFolder]);
}

gulp.task('clean', cleanTask);

//Lint

function lintScriptsTask () {
  gulp.src(srcPaths.scripts)
    .pipe(plugins.cached('lint'))
    .pipe(plugins.eslint({quiet : true}))
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
}
gulp.task('lint-scripts', lintScriptsTask);

function lintTestsTask () {
  gulp.src(srcPaths.tests)
    .pipe(plugins.cached('lint'))
    .pipe(plugins.eslint({quiet : true}))
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
}
gulp.task('lint-tests', lintTestsTask);

// Demo app

function demoAppTask () {
  gulp.src(srcPaths.demo)
    .pipe(plugins.plumber({
      errorHandler : handleError
    }))
    .pipe(plugins.cached('demo'))
    .pipe(gulp.dest(publicFolder));
}

gulp.task('demo', demoAppTask);
gulp.task('clean-demo', ['clean'], demoAppTask);

// Fonts

function fontsTask () {
  gulp.src(srcPaths.fonts)
    .pipe(plugins.plumber({
      errorHandler : handleError
    }))
    .pipe(plugins.cached('fonts'))
    .pipe(gulp.dest(destPaths.fonts));

}
gulp.task('fonts', fontsTask);
gulp.task('clean-fonts', ['clean'], fontsTask);

// Images

function imagesTask () {
  return gulp.src(srcPaths.images)
    .pipe(plugins.plumber({
      errorHandler : handleError
    }))
    .pipe(plugins.cached('images'))
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(destPaths.images));
}
gulp.task('images', imagesTask);
gulp.task('clean-images', ['clean'], imagesTask);

// Scripts

var scriptsTask = function () {
  return streamqueue({
    objectMode : true
  },
  gulp.src(srcPaths.templates)
    .pipe(plugins.plumber({
      errorHandler : handleError
    }))
    .pipe(plugins.templateCache('templateCache.js', {module : 'watson.common.ui.templates', standalone : true}))
    .pipe(gulp.dest(destPaths.scripts)),
  gulp.src(srcPaths.scripts)
    .pipe(plugins.plumber({
      errorHandler : handleError
    })))
    .pipe(plugins.order(['**/common-ui.js', '*']))
    .pipe(plugins.concat('ibmwatson.js'))
    .pipe(gulp.dest(destPaths.scripts))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify())
    .pipe(plugins.rename({
      extname : '.min.js'
    }))
    .pipe(plugins.sourcemaps.write('../maps'))
    .pipe(gulp.dest(destPaths.scripts));
};
gulp.task('scripts', ['test'], scriptsTask);
gulp.task('clean-scripts', ['clean', 'test'], scriptsTask);

// Serve

function serveTask () {
  var port = 3000;
  var app = express();
  app.use(express.static(__dirname + '/dist'));
  app.use(express.static(__dirname + '/public'));
  app.use('/bower_components', express.static(__dirname + '/bower_components'));
  app.listen(port, '0.0.0.0');

  plugins.gutil.log(plugins.gutil.colors.green('Demo app available on port %d'), port);
}
gulp.task('serve', ['build', 'demo'], serveTask);
gulp.task('clean-serve', ['clean-build', 'clean-demo'], serveTask);

// Styles

function stylesTask () {
  return merge(
    gulp.src(srcPaths.styles)
      .pipe(plugins.plumber({
        errorHandler : handleError
      }))
      .pipe(plugins.cached('styles'))
      .pipe(gulp.dest(destPaths.styles)),
    gulp.src(srcPaths.rootStyles)
      .pipe(plugins.plumber({
        errorHandler : handleError
      }))
      .pipe(plugins.cached('rootStyles'))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        outputStyle : 'compressed'
      }))
      .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(plugins.rename({
        extname : '.min.css'
      }))
      .pipe(plugins.sourcemaps.write('../maps'))
      .pipe(gulp.dest(destPaths.styles))
  );
}
gulp.task('styles', stylesTask);
gulp.task('clean-styles', ['clean'], stylesTask);

// Tests

var testTask = function testTask (done) {
  var KarmaServer = karma.Server;

  KarmaServer.start({
    configFile : __dirname + '/karma.conf.js',
    singleRun : true
  }, function () {
    done();
  });
};
gulp.task('test', testTask);
gulp.task('clean-test', ['clean'], testTask);

// Meta

gulp.task('default', ['lint-scripts', 'lint-tests', 'build']);
gulp.task('build', ['fonts', 'images', 'scripts', 'styles']);
gulp.task('clean-build', ['clean-fonts', 'clean-images', 'clean-scripts', 'clean-styles']);
