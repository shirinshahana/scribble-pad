const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const prettify = require('gulp-jsbeautifier');
const cleanCSS = require('gulp-clean-css');
const inject = require('gulp-inject');
const wiredep = require('wiredep').stream;
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const uglify = require('gulp-uglifyjs');
const ngAnnotate = require('gulp-ng-annotate');
const useref = require('gulp-useref');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const exec = require('child_process').exec;

gulp.task('server', function() {
  nodemon({
    script: 'server.js',
    ext: 'js html css',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('prettify', function() {
  gulp.src(['./**/*.css', './**/*.html', './**/*.js'])
    .pipe(prettify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('minify-css', function() {
  return gulp.src('./public/styles/*.css')
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('./dist/public/styles'));
});

gulp.task('inject', function() {
  var target = gulp.src('./public/index.html.in')
    .pipe(rename('index.html'));
  var sources = gulp.src(['./public/**/*.js', './public/**/*.css'], { read: false });
  return target.pipe(inject(sources, { ignorePath: 'public', addRootSlash: false }))
    .pipe(wiredep({ directory: 'bower_components' }))
    .pipe(gulp.dest('./public'));
});

gulp.task('inject-pro', function() {
  var target = gulp.src('./public/index.html.in')
    .pipe(rename('index.html'));
  var sources = gulp.src(['./public/**/*.js', 'public/**/*.css'], { read: false });
  return target.pipe(inject(sources, { ignorePath: 'public', addRootSlash: false }))
    .pipe(wiredep({ directory: 'bower_components' }))
    .pipe(useref())
    .pipe(gulpif('*.js', ngAnnotate()))
    .pipe(gulpif('*.js', babel({ 'presets': ['es2015'] })).on('error', gutil.log))
    .pipe(gulpif('*.js', uglify()).on('error', gutil.log))
    .pipe(gulpif('*.css', cleanCSS()))
    .pipe(gulp.dest('./public'));
});

gulp.task('staging', function (cb) {
  exec('shipit staging deploy', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})