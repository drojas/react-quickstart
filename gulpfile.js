var path    = require('path');
var gulp    = require('gulp');
var webpack = require('gulp-webpack');

var CLIENT_PATH = path.join(__dirname, 'src/js/client');

gulp.task('default', function() {
  var clientConfig = require(path.join(CLIENT_PATH, 'webpack.config.js'));
  return gulp.src('src/js/client')
    .pipe(webpack(clientConfig))
    .pipe(gulp.dest('assets/'));
});
