'use strict';

var del           = require('del');
var path          = require('path');
var gulp          = require('gulp');
var react         = require('gulp-react');
var concat        = require('gulp-concat');
var webpack       = require('gulp-webpack');
var ext_replace   = require('gulp-ext-replace');
var clientConfig  = require('./webpack.client-config.js');

var paths = {
  client: {
    dir: 'src/js/client',
    src: 'src/js/client/index.js',
    jsx: 'src/js/client/**/*.jsx',
    css: 'src/js/client/**/*.css',
    dest: 'assets/'
  }
};

gulp.task('clean', function(cb) {
  del(['assets'], cb);
});

gulp.task('client', ['css', 'jsx'], function() {
  return gulp.src(paths.client.src)
    .pipe(webpack(clientConfig))
    .pipe(gulp.dest(paths.client.dest));
});

gulp.task('jsx', function() {
  return gulp.src(paths.client.jsx)
    .pipe(react())
    .pipe(ext_replace('.js'))
    .pipe(gulp.dest(paths.client.dir))
});

gulp.task('css', function() {
  return gulp.src(paths.client.css)
    .pipe(concat('style.css'))
    .pipe(gulp.dest(paths.client.dest))
});

gulp.task('default', ['clean', 'client']);
