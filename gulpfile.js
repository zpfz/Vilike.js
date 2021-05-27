const gulp = require('gulp');
const rename = require('gulp-rename');
const eslint = require('gulp-eslint');
const uglify = require('gulp-uglify');
const del = require('del');
const connect = require('gulp-connect');
const gutil = require('gulp-util');
const babel = require('gulp-babel');
// const version = require('./package.json').version;

const jsPath = './src/index.js';

gulp.task('eslint', async () => {
  await gulp
    .src(jsPath)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Clean
gulp.task('clean', async () => {
  await del(['./dist/']);
});

// js:build
gulp.task('js:build', async () => {
  await gulp
    .src(jsPath)
    // .pipe(
    //   babel({
    //     presets: ['es2015']
    //   })
    // )
    .pipe(rename('Vilike.js'))
    .pipe(gulp.dest('./dist/'))
    .pipe(uglify())
    .on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
    })
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'));
});

// Server
gulp.task('server', () => {
  connect.server({
    root: './test/',
    livereload: true
  });
});
gulp.task('html:dev', async () => {
  await gulp.src('./test/index.html').pipe(connect.reload());
});

gulp.task('js:dev', async () => {
  await gulp.src('./src/index.js').pipe(gulp.dest('./test/')).pipe(connect.reload());
});
gulp.task('js:copy', async () => {
  await gulp.src('./src/index.js')
    .pipe(
      babel({
        presets: ['es2015']
      })
    )
    .pipe(gulp.dest('./test/'));
});

gulp.task('watch', () => {
  gulp.watch('./src/index.js', gulp.series('js:dev'));
  gulp.watch('./test/index.html', gulp.series('html:dev'));
});

gulp.task(
  'default',
  gulp.series(gulp.parallel('eslint', 'js:copy', 'server', 'watch'))
);
gulp.task('build', gulp.series('clean', 'eslint', 'js:build'));