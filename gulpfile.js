const gulp = require('gulp');
const gulpZip = require('gulp-zip');

const { logger } = require('./lib');

function zip() {
  logger();
  return gulp.src('*.js')
    .pipe(gulpZip('archive.zip'))
    .pipe(gulp.dest('dist'));
}

exports.default = gulp.series(zip);
