// TODO
//
// Serve demo app
//
// Watch for file changes BUT do not live reload browser (not helpful for
// visual design/comparisons etc. and easy enough to refresh browser
// manually
//
// Include scss in dist/styles
//
// Uncomment linting
//

'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var del = require('del');
var express = require('express');
var streamqueue = require('streamqueue');

// Load gulp plugins
var plugins = require('gulp-load-plugins')({
  rename: {
    'gulp-angular-templatecache': 'templateCache',
    'gulp-util': 'gutil'
  }
});

// All tasks should use the gulp plumber plugin with this error
// handler, otherwise pipes break when there are errors
var handleError = function handleError(err) {
  plugins.gutil.log(plugins.gutil.colors.red(err));
  this.emit('end');
};

var srcFolder = './src';
var srcPaths = {
  demo: ['./app/**/*'],
  fonts: [srcFolder + '/assets/fonts/**/*.{eot,svg,ttf,woff,woff2}'],
  images: [srcFolder + '/assets/images/**/*.{png,ico,jpg,gif,svg}'],
  scripts: [
    srcFolder + '/ng/**/*.js',
    '!/**/*.spec.js'
  ],
  styles: [srcFolder + '/assets/styles/ibmwatson.scss'],
  templates: [srcFolder + '/ng/**/*.html']
};

var distFolder = './dist';
var destPaths = {
  fonts: distFolder + '/fonts',
  images: distFolder + '/images',
  styles: distFolder + '/styles',
  scripts: distFolder + '/js'
};

var publicFolder = './public';

// Clean

var cleanTask = function cleanTask() {
  return del([distFolder, publicFolder]);
};
gulp.task('clean', cleanTask);

// Demo app

var demoAppTask = function demoAppTask() {
  gulp.src(srcPaths.demo)
    .pipe(plugins.plumber({
      errorHandler: handleError
    }))
    .pipe(plugins.cached('demo'))
    .pipe(gulp.dest(publicFolder));
};
gulp.task('demo', demoAppTask);
gulp.task('clean-demo', ['clean'], demoAppTask);

// Fonts

var fontsTask = function fontsTask() {
  gulp.src(srcPaths.fonts)
    .pipe(plugins.plumber({
      errorHandler: handleError
    }))
    .pipe(plugins.cached('fonts'))
    .pipe(gulp.dest(destPaths.fonts));

};
gulp.task('fonts', fontsTask);
gulp.task('clean-fonts', ['clean'], fontsTask);

// Images

var imagesTask = function imagesTask() {
  return gulp.src(srcPaths.images)
    .pipe(plugins.plumber({
      errorHandler: handleError
    }))
    .pipe(plugins.cached('images'))
    .pipe(plugins.imagemin())
    .pipe(gulp.dest(destPaths.images));
};
gulp.task('images', imagesTask);
gulp.task('clean-images', ['clean'], imagesTask);

// Scripts

var scriptsTask = function () {
  return streamqueue({
      objectMode: true
    },
    gulp.src(srcPaths.templates)
      .pipe(plugins.plumber({
        errorHandler: handleError
      }))
      .pipe(plugins.templateCache('templateCache.js', {module: 'watson.common.ui.templates', standalone: true}))
      .pipe(gulp.dest(destPaths.scripts)),
    gulp.src(srcPaths.scripts)
      .pipe(plugins.plumber({
        errorHandler: handleError
      }))
    //.pipe(plugins.cached('scripts'))
    //.pipe(plugins.eslint())
    //.pipe(plugins.eslint.format())
    //.pipe(plugins.eslint.failAfterError())
    //.pipe(plugins.remember('scripts')))
  )
    .pipe(plugins.order(['**/common-ui.js', '*']))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concat('ibmwatson-common-ui.js'))
    .pipe(gulp.dest(destPaths.scripts))
    .pipe(plugins.ngAnnotate())
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write('../maps'))
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destPaths.scripts));
};
gulp.task('scripts', scriptsTask);
gulp.task('clean-scripts', ['clean'], scriptsTask);

// Serve

var serveTask = function serveTask() {
  var port = 3000;
  var app = express();
  app.use(express.static(__dirname + '/dist'));
  app.use(express.static(__dirname + '/public'));
  app.use('/bower_components', express.static(__dirname + '/bower_components'));
  app.listen(port, '0.0.0.0');

  plugins.gutil.log(plugins.gutil.colors.green('Demo app available on port %d'), port);
};
gulp.task('serve', ['build', 'demo'], serveTask);
gulp.task('clean-serve', ['clean-build', 'clean-demo'], serveTask);

// Styles

var stylesTask = function stylesTask() {
  return gulp.src(srcPaths.styles)
    .pipe(plugins.plumber({
      errorHandler: handleError
    }))
    .pipe(plugins.cached('styles'))
    //.pipe(gulp.dest(destPaths.styles))
    .pipe(plugins.rename('ibmwatson-common-ui.css'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass({
      outputStyle: 'compressed'
    }))
    .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(plugins.sourcemaps.write('../maps'))
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destPaths.styles));
};
gulp.task('styles', stylesTask);
gulp.task('clean-styles', ['clean'], stylesTask);

// Meta

gulp.task('default', ['build']);
gulp.task('build', ['fonts', 'images', 'scripts', 'styles']);
gulp.task('clean-build', ['clean-fonts', 'clean-images', 'clean-scripts', 'clean-styles']);
