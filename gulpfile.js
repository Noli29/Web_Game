'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    include = require("gulp-include"),
    autoprefixer = require('gulp-autoprefixer');

// server connect
gulp.task('connect', function() {
  connect.server({
    root: 'app/',
    port: 1111,
    livereload: true
  });
});

// css
gulp.task('css', function () {
  gulp.src('scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(connect.reload());
});

// html
gulp.task('html', function() {
  gulp.src('app/*.html')
    .pipe(connect.reload());
});
gulp.task('incHTML', function() {
  gulp.src('html/*.html')
  .pipe(include())
  .pipe(gulp.dest('app/'))
  .pipe(connect.reload());
});

// js
gulp.task('js', function() {
  gulp.src('app/js/*js')
    .pipe(connect.reload());
});

// watch
gulp.task('watch', function () {
  gulp.watch(['app/css/*css'], ['css']);
  gulp.watch(['scss/*scss'], ['css']);
  gulp.watch(['scss/*/*scss'], ['css']);
  gulp.watch(['app/*html'], ['html']);
  gulp.watch(['html/*html'], ['incHTML']);
  gulp.watch(['html/*/*html'], ['incHTML']);
  gulp.watch(['app/js/*js'], ['js']);
});

// default
gulp.task('default', [
  'connect', 
  'html', 
  'incHTML',
  'css',
  'js',
  'watch'
]);