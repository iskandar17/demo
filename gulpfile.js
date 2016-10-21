"use strict;"
var gulp = require('gulp');
var webserver = require('gulp-webserver');
gulp.task('webserver', function() {
  gulp.src('public')
    .pipe(webserver({
      fallback: 'test.html'
    }));
});
gulp.task('default', ['webserver']);