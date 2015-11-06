var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylus = require('gulp-stylus'),
    mocha = require('gulp-mocha'),
    babel = require("gulp-babel"),
    pkg = require('./package.json');

gulp.task('lint', function() {
  return gulp.src(['./src/browser/**/*.js', './src/renderer/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('stylus', function () {
  gulp.src('./src/stylus/style.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./src/static/css'));
});

gulp.task('script', function () {
  return gulp.src('src/renderer/**/*.{js,jsx}')
    .pipe(babel({
      "presets": ['react']
    }))
    .pipe(gulp.dest('src/static/js'));
});

gulp.task('dev', function() {
  gulp.watch('src/stylus/**/*.styl', ['stylus']);
  gulp.watch('src/renderer/**/*.{js,jsx}', ['script']);
});

gulp.task('test', function () {
  require('coffee-script/register');
  return gulp.src('spec/**/*.spec.coffee')
    .pipe(mocha({reporter: 'spec', timeout: 15000}));
});
