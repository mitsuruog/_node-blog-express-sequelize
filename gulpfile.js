var gulp = require('gulp');
var del = require('del');
var espower = require('gulp-espower');
var mocha = require("gulp-mocha");

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

gulp.task('test', ['power-assert'], () => {
  gulp.src('./.tmp/**/*.js')
    .pipe(mocha({
      reporter: 'nyan'
    }));
});

gulp.task('default', ['clean:test', 'test']);
