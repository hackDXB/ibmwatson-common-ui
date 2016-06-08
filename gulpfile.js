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

var gulp = require('gulp');
var del = require('del');
var express = require('express');
var livereload = require('connect-livereload');
var runSequence = require('run-sequence');
var karma = require('karma');
var merge = require('merge-stream');
var streamqueue = require('streamqueue');

// Load gulp plugins
var plugins = require('gulp-load-plugins')({
  rename : {
    'gulp-angular-templatecache' : 'templateCache',
    'gulp-util' : 'gutil',
    'ghPages' : 'gh-pages'
  }
});

// All tasks should use the gulp plumber plugin with this error
// handler, otherwise pipes break when there are errors
function handleError (err) {
  plugins.gutil.log(plugins.gutil.colors.red(err));
  this.emit('end');
}

var srcFolder = './src';
var distFolder = './dist';
var publicFolder = './public';
var pagesFolder = './.publish';
var coverageFolder = './coverage';

var paths = {
  demo : ['./app/**/*'],
  fonts : [srcFolder + '/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}'],
  images : [srcFolder + '/assets/images/**/*.{png,ico,jpg,gif,svg}'],
  scripts : [
    srcFolder + '/ng/**/!(*.spec|*.mock).js'
  ],
  tests : [
    srcFolder + '/ng/**/*.{spec,mock}.js'
  ],
  rootStyles : [srcFolder + '/assets/styles/ibmwatson.scss'],
  styles : [srcFolder + '/assets/styles/**/*.scss'],
  templates : [srcFolder + '/ng/**/*.html'],
  bower : ['./bower_components/**/*'],
  dest : {
    all : [distFolder + '/**/*'],
    fonts : distFolder + '/fonts',
    images : distFolder + '/images',
    styles : distFolder + '/styles',
    scripts : distFolder + '/js'
  },
  public : [publicFolder + '/**/*']
};

// Clean

function cleanTask () {
  return del([distFolder, publicFolder, coverageFolder, pagesFolder]);
}
gulp.task('clean', cleanTask);

//Lint

function lintScriptsTask () {
  return gulp.src(paths.scripts)
    .pipe(plugins.cached('lint'))
    .pipe(plugins.eslint({quiet : true}))
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
}
gulp.task('lint-scripts', lintScriptsTask);

function lintTestsTask () {
  return gulp.src(paths.tests)
    .pipe(plugins.cached('lint'))
    .pipe(plugins.eslint({quiet : true}))
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
}
gulp.task('lint-tests', lintTestsTask);

// Demo app

function demoAppTask () {

  var app = gulp.src(paths.demo.concat(paths.dest.all))
    .pipe(plugins.plumber({
      errorHandler : handleError
    }))
    .pipe(plugins.cached('demo'))
    .pipe(gulp.dest(publicFolder));

  var bower = gulp.src(paths.bower)
    .pipe(plugins.plumber({
      errorHandler : handleError
    }))
    .pipe(plugins.cached('demo'))
    .pipe(gulp.dest(publicFolder + '/bower_components'));

  return merge(app, bower);

}
gulp.task('demo', ['build'], demoAppTask);

// Fonts

function fontsTask () {
  return gulp.src(paths.fonts)
    .pipe(plugins.plumber({
      errorHandler : handleError
    }))
    .pipe(plugins.cached('fonts'))
    .pipe(gulp.dest(paths.dest.fonts))
    .pipe(plugins.livereload());

}
gulp.task('fonts', fontsTask);

// Images

function imagesTask () {
  return gulp.src(paths.images)
    .pipe(plugins.plumber({
      errorHandler : handleError
    }))
    .pipe(plugins.cached('images'))
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(paths.dest.images))
    .pipe(plugins.livereload());
}
gulp.task('images', imagesTask);

// Scripts

var scriptsTask = function () {
  return streamqueue({
    objectMode : true
  },
  gulp.src(paths.templates)
    .pipe(plugins.plumber({
      errorHandler : handleError
    }))
    .pipe(plugins.templateCache('templateCache.js', {module : 'watson.common.ui.templates', standalone : true}))
    .pipe(gulp.dest(paths.dest.scripts)),
  gulp.src(paths.scripts)
    .pipe(plugins.plumber({
      errorHandler : handleError
    })))
    .pipe(plugins.order(['**/common-ui.js', '*']))
    .pipe(plugins.concat('ibmwatson.js'))
    .pipe(gulp.dest(paths.dest.scripts))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify())
    .pipe(plugins.rename({
      extname : '.min.js'
    }))
    .pipe(plugins.sourcemaps.write('../maps'))
    .pipe(gulp.dest(paths.dest.scripts))
    .pipe(plugins.livereload());
};
gulp.task('scripts', ['test'], scriptsTask);

// Serve

function startServer () {
  var port = 3000;
  var app = express();
  app.use(livereload());
  app.use(express.static(__dirname + '/public'));
  app.listen(port, '0.0.0.0');

  plugins.gutil.log(plugins.gutil.colors.green('Demo app available on port %d'), port);
}
gulp.task('start-server', startServer);

function serveTask (callback) {
  runSequence('clean',
    ['lint-scripts', 'lint-tests'],
    ['build', 'demo'],
    'start-server',
    'watch',
    callback);
}

gulp.task('serve', serveTask);
gulp.task('start', serveTask);

// Styles

function stylesTask () {
  return merge(
    gulp.src(paths.styles)
      .pipe(plugins.plumber({
        errorHandler : handleError
      }))
      .pipe(plugins.cached('styles'))
      .pipe(gulp.dest(paths.dest.styles)),
    gulp.src(paths.rootStyles)
      .pipe(plugins.plumber({
        errorHandler : handleError
      }))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        outputStyle : 'compressed'
      }))
      .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(plugins.rename({
        extname : '.min.css'
      }))
      .pipe(plugins.sourcemaps.write('../maps'))
      .pipe(gulp.dest(paths.dest.styles))
  ).pipe(plugins.livereload());
}
gulp.task('styles', stylesTask);

// Tests

var testTask = function testTask (callback) {
  var KarmaServer = karma.Server;

  KarmaServer.start({
    configFile : __dirname + '/karma.conf.js',
    singleRun : true
  }, function () {
    callback();
  });
};
gulp.task('test', testTask);

// Watch

function watchTask (callback) {
  plugins.livereload.listen();
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.fonts, ['fonts']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.scripts, ['scripts']);

  callback();
}
gulp.task('watch', watchTask);

function buildTask (callback) {
  runSequence('clean',
    ['fonts', 'images', 'scripts', 'styles'],
    callback);
}

gulp.task('build', buildTask);

function pagesTask () {
  return gulp.src(paths.public)
    .pipe(plugins.ghPages());
}

gulp.task('pages', ['demo'], pagesTask);

// Meta
gulp.task('default', ['lint-scripts', 'lint-tests', 'build']);
