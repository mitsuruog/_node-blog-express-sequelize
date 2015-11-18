var gulp = require('gulp');
var del = require('del');
var espower = require('gulp-espower');
var mocha = require("gulp-mocha");
var jscs = require('gulp-jscs');
var eslint = require('gulp-eslint');

var srcDir = [
  'app/**/*.js',
  'config/**/*.js',
  'public/javascripts/**/*.js',
  'test/**/*.js',
  'gulpfile.js',
];

gulp.task('clean:test', () => {
  return del([
    './.tmp/**/*'
  ]);
});

gulp.task('power-assert', () => {
  gulp.src('./test/**/*.js')
    .pipe(espower())
    .pipe(gulp.dest('./.tmp'));
});

gulp.task('jscs', () => {
  gulp.src(srcDir)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('lint', () => {
  gulp.src(srcDir)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('test', ['power-assert'], () => {
  gulp.src('./.tmp/**/*.js')
    .pipe(mocha({
      reporter: 'nyan'
    }));
});

gulp.task('default', ['clean:test', 'test']);
