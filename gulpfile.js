var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");

gulp.task('sass', function () {
  return gulp.src('styles/*.scss')
    .pipe(sass())
    .pipe(concat('main.css'))
    .pipe(autoprefixer())
    .pipe(minifyCss({}))
    .pipe(gulp.dest('styles/'));
});

gulp.task('js', function () {
  gulp.src(['scripts/*.js', '!scripts/app.min.js'])
    .pipe(babel())
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('scripts/'))
});

gulp.task('serve', function () {
  gulp.watch('styles/*.scss', ['sass']);
  gulp.watch(['scripts/*.js', '!scripts/app.min.js'], ['js']);
  browserSync({
    notify: false,
    logPrefix: 'verbsPWA',
    server: ['.'],
    open: false
  });
  gulp.watch([
    './*.html',
    './scripts/*.js',
    './styles/*.css',
    '!./service-worker.js',
    '!./gulpfile.js'
  ], reload);
});

gulp.task('default', ['serve']);