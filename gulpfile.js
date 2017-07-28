var gulp = require('gulp');
var babel = require('gulp-babel');
var changed = require('gulp-changed');

var paths = {
  src: 'src/*.js',
  dest: 'dist'
};

gulp.task('watch', function() {
  return gulp.watch(paths.src, ['build']);
});

gulp.task('build', function () {
  return gulp.src(paths.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.dest));
});

gulp.task('default', ['watch', 'build']);