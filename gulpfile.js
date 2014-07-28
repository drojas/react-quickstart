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
var clientConfig  = require('./src/js/server/webpack.client-config.js');

// common paths
var paths = {
  client: {
    directoryName:       'src/js/server/client',
    entryPoint:          'src/js/server/client/index.js',
    jsxFiles:            'src/js/server/client/**/*.jsx',
    cssFiles:            'src/js/server/client/**/*.css',
    targetDirectoryName: 'build/assets',
    styleAssetName:      'style.css',
    outputFilename:      clientConfig.output.filename
  },
  server: {
    jsFiles:             'src/js/server/**/*.js',
    targetDirectoryName: 'build/server',
    relativeAssetsPath:  '"../assets"'
  }
};

// build server
gulp.task('build-server', ['build-client'], function() {
  return gulp.src(paths.server.jsFiles)
    .pipe(preprocess({context: { ASSETS_PATH: paths.server.relativeAssetsPath}}))
    .pipe(gulp.dest(paths.server.targetDirectoryName));
});

// build the app after taking care of css and jsx
gulp.task('build-client', ['clean-client', 'build-css', 'compile-jsx'], function() {
  return gulp.src(paths.client.entryPoint)
    .pipe(webpack(clientConfig))
    .pipe(gulp.dest(paths.client.targetDirectoryName))
    .pipe(uglify())
    .pipe(replaceExt('.min.js'))
    .pipe(gulp.dest(paths.client.targetDirectoryName));
});

// compile jsx files in-place
gulp.task('compile-jsx', ['clean-jsx'], function() {
  return gulp.src(paths.client.jsxFiles)
    .pipe(react())
    .pipe(replaceExt('.js'))
    .pipe(gulp.dest(paths.client.directoryName));
});

// concat all css files from app into a main style
gulp.task('build-css', ['clean-css'], function() {
  return gulp.src(paths.client.cssFiles)
    .pipe(concat(paths.client.styleAssetName))
    .pipe(gulp.dest(paths.client.targetDirectoryName));
});

// cleaning

// clean server build output
gulp.task('clean-server', function() {
  return gulp.src(paths.server.targetDirectoryName, { read: false })
    .pipe(rimraf());
});

// clean client build output
gulp.task('clean-client', function() {
  var outputFile = path.join(paths.client.targetDirectoryName,
                             paths.client.outputFilename);
  return gulp.src(outputFile, { read: false })
    .pipe(rimraf());
});

// clean jsx compilation output
gulp.task('clean-jsx', function() {
  return gulp.src(paths.client.jsxFiles, { read: false })
    .pipe(replaceExt('.js'))
    .pipe(rimraf());
});

// clean css build output
gulp.task('clean-css', function() {
  var outputFile = path.join(paths.client.targetDirectoryName,
                              paths.client.styleAssetName)
  return gulp.src(outputFile, { read: false })
    .pipe(rimraf());
});

gulp.task('default', ['build-server']);
