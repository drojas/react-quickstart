'use strict';

var del           = require('del');
var path          = require('path');
var gulp          = require('gulp');
var react         = require('gulp-react');
var concat        = require('gulp-concat');
var webpack       = require('gulp-webpack');
var ext_replace   = require('gulp-ext-replace');
var clientConfig  = require('./webpack.client-config.js');

// common paths
var paths = {
  client: {
    directoryName:       'src/js/client',
    entryPoint:          'src/js/client/index.js',
    jsxFiles:            'src/js/client/**/*.jsx',
    cssFiles:            'src/js/client/**/*.css',
    targetDirectoryName: 'build/assets',
    styleAssetName:      'style.css'
  }
};

// clean client build output
gulp.task('clean-client', function(cb) {
  del([path.join(paths.client.targetDirectoryName, clientConfig.output.filename)], cb);
});

// build the app after taking care of css and jsx
gulp.task('build-client', ['clean-client', 'build-css', 'compile-jsx'], function() {
  return gulp.src(paths.client.entryPoint)
    .pipe(webpack(clientConfig))
    .pipe(gulp.dest(paths.client.targetDirectoryName));
});

// compile jsx files in-place
gulp.task('compile-jsx', function() {
  return gulp.src(paths.client.jsxFiles)
    .pipe(react())
    .pipe(ext_replace('.js'))
    .pipe(gulp.dest(paths.client.directoryName))
});

// clean css build output
gulp.task('clean-css', function(cb) {
  del([path.join(paths.client.targetDirectoryName, paths.client.styleAssetName)], cb);
});

// concat all css files from app into a main style
gulp.task('build-css', ['clean-css'], function() {
  return gulp.src(paths.client.cssFiles)
    .pipe(concat(paths.client.styleAssetName))
    .pipe(gulp.dest(paths.client.targetDirectoryName))
});

gulp.task('default', ['build-client']);
