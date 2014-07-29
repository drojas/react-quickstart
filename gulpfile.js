'use strict';

var path          = require('path');
var gulp          = require('gulp');
var react         = require('gulp-react');
var concat        = require('gulp-concat');
var rimraf        = require('gulp-rimraf');
var webpack       = require('gulp-webpack');
var uglify        = require('gulp-uglifyjs');
var preprocess    = require('gulp-preprocess');
var replaceExt    = require('gulp-ext-replace');
var appConfig     = require('./src/js/server/webpack.app-config.js');

// common paths
var paths = {
  app: {
    sourceDirectoryName: 'src/js/server/app',
    entryPoint:          'src/js/server/app/index.js',
    jsxFiles:            'src/js/server/app/**/*.jsx',
    cssFiles:            'src/js/server/app/**/*.css',
    targetDirectoryName: 'build/assets',
    styleAssetName:      'style.css',
    outputFilename:      appConfig.output.filename
  },
  server: {
    jsFiles:             'src/js/server/**/*.js',
    targetDirectoryName: 'build/server',
    relativeAssetsPath:  '"../assets"'
  }
};

// build server
gulp.task('build-server', ['build-app'], function() {
  var relativeAssetsPath = paths.server.relativeAssetsPath;
  return gulp.src(paths.server.jsFiles)
    .pipe(preprocess({ context: { ASSETS_PATH: relativeAssetsPath }}))
    .pipe(gulp.dest(paths.server.targetDirectoryName));
});

// build the app after taking care of css and jsx
gulp.task('build-app', ['clean-app', 'build-css', 'compile-jsx'], function() {
  return gulp.src(paths.app.entryPoint)
    .pipe(webpack(appConfig))
    .pipe(gulp.dest(paths.app.targetDirectoryName))
    .pipe(uglify())
    .pipe(replaceExt('.min.js'))
    .pipe(gulp.dest(paths.app.targetDirectoryName));
});

// compile jsx files in-place
gulp.task('compile-jsx', ['clean-jsx'], function() {
  return gulp.src(paths.app.jsxFiles)
    .pipe(react())
    .pipe(replaceExt('.js'))
    .pipe(gulp.dest(paths.app.sourceDirectoryName));
});

// concat all css files from app into a main style
gulp.task('build-css', ['clean-css'], function() {
  return gulp.src(paths.app.cssFiles)
    .pipe(concat(paths.app.styleAssetName))
    .pipe(gulp.dest(paths.app.targetDirectoryName));
});

// cleaning

// clean server build output
gulp.task('clean-server', function() {
  return gulp.src(paths.server.targetDirectoryName, { read: false })
    .pipe(rimraf());
});

// clean app build output
gulp.task('clean-app', function() {
  var outputFile = path.join(paths.app.targetDirectoryName,
                             paths.app.outputFilename);
  var minifiedOutputFile = outputFile.replace(/.js$/, '.min.js');
  var outputFiles = [outputFile, minifiedOutputFile];
  return gulp.src(outputFiles, { read: false })
    .pipe(rimraf());
});

// clean jsx compilation output
gulp.task('clean-jsx', function() {
  return gulp.src(paths.app.jsxFiles, { read: false })
    .pipe(replaceExt('.js'))
    .pipe(rimraf());
});

// clean css build output
gulp.task('clean-css', function() {
  var outputFile = path.join(paths.app.targetDirectoryName,
                             paths.app.styleAssetName)
  return gulp.src(outputFile, { read: false })
    .pipe(rimraf());
});

// clean all output
gulp.task('clean', ['clean-jsx'], function() {
  return gulp.src('build').pipe(rimraf());
});

gulp.task('default', ['build-server']);
