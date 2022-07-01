// Initialize modules
const { src, dest, watch, series } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));

// Sass Task
function scssTask() {
  return src('app/scss/*.scss').pipe(sass()).pipe(dest('dist/css')).pipe(browserSync.stream());
}

// JavaScript Task
function jsTask() {
  return src('app/js/*.js').pipe(dest('dist/js'));
}

// Browsersync
function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch('*.html', browserSyncReload);
  watch(['app/scss/**/*.scss', 'app/js/**/*.js'], series(scssTask, jsTask, browserSyncReload));
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);

// Build Gulp Task
exports.build = series(scssTask, jsTask);
