'use strict';

var gulp = require('gulp');
var serve = require('gulp-serve');
var htmlmin = require('gulp-htmlmin');
var inlineSource = require('gulp-inline-source');
var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');
var postcss = require('gulp-postcss');
var cssnext = require('postcss-cssnext');
var GulpSSH = require('gulp-ssh')
var wbBuild = require('workbox-build')

gulp.task('default', ['serve']);
gulp.task('serve', ['css', 'css:watch'], serve('src'));
gulp.task('serve-prod', ['build'], serve('dist'));

gulp.task('build', ['css', 'copy-images'], function() {
  return gulp.src('src/*.html')
    .pipe(inlineSource())
    .pipe(htmlmin({
      minifyCSS: true,
      minifyJS: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'))
});

gulp.task('css', function () {
  return gulp.src('src/css/*.scss')
    .pipe(sassLint({
      rules: {
        'property-sort-order': 0
      }
    }))
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      cssnext({ browsers: ['> 1%'] })
    ]))
    .pipe(gulp.dest('src/css'));
});

gulp.task('css:watch', function () {
  return gulp.watch('src/css/*.scss', ['css']);
});

gulp.task('copy-images', function() {
  return gulp.src('src/img/*.png')
    .pipe(gulp.dest('dist/img'))
});

gulp.task('bundle-sw', function() {
  return wbBuild.generateSW({
    globDirectory: './dist/',
    swDest: './dist/sw.js',
    globPatterns: ['**\/*.{html,js,css}']
  })
})

gulp.task('deploy', ['build', 'bundle-sw'], function () {
  var sshConfig = require('./.ssh_config');
  var gulpSSH = new GulpSSH({
    sshConfig: sshConfig.connection
  });

  return gulp.src('dist/**')
    .pipe(gulpSSH.dest(sshConfig.destination))
})
