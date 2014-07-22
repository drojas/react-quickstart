'use strict';

var path          = require('path');
var gulp          = require('gulp');
var webpack       = require('gulp-webpack');
var del           = require('del');
var clientConfig  = require('./webpack.client-config.js');

var paths = {
  client: {
    src: 'src/js/client/index.js',
    dest: 'assets/'
  }
};

gulp.task('clean', function(cb) {
  del(['assets'], cb);
});

gulp.task('client', ['clean'], function() {
  return gulp.src(paths.client.src)
    .pipe(webpack(clientConfig))
    .pipe(gulp.dest(paths.client.dest));
});

gulp.task('default', ['client']);
