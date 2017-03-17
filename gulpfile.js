var gulp = require('gulp');
var sass = require('gulp-Sass');
var sassGlob = require('gulp-sass-glob');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var bs = require('browser-sync').create();

// Config
var config = require('./gulp.config.js');  


/* Not all tasks need to use streams, a gulpfile is just another node program
 * and you can use all packages available on npm, but it must return either a
 * Promise, a Stream or take a callback and call it
 */
function clean() {
  // You can use multiple globbing patterns as you would with `gulp.src`,
  // for example if you are using del 2.0 or above, return its promise
  return del([ 'dist' ]);
}

/*
 * Define our tasks using plain functions
 */
function styles() {
  return gulp.src(config.paths.styles.src + config.projectName + '.scss')
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.paths.styles.dest));
}

// Scripts
function scripts() {
  return gulp.src(config.paths.scripts.src)
    .pipe(concat(config.projectName + '.js'))
    .pipe(gulp.dest(config.paths.scripts.dest));
}


// Sounds
function sounds() {
  return gulp.src(config.paths.sounds.src)
  .pipe(gulp.dest(config.paths.sounds.dest));
}

// Archives .html base site
function viewsBase() {
  return gulp.src(config.paths.views.base);
}

// Archives .html in app folder
function viewsApp() {
  return gulp.src(config.paths.views.app);
}

function watch() {
  gulp.watch(config.paths.scripts.src, scripts);
  gulp.watch(config.paths.styles.src, styles);
}

function sync() {
  bs.init({
    server: {
      baseDir: "./",
    },
    notify: true,
    reloadDelay: 10000
  }); 

  gulp.watch([ 
    config.paths.scripts.src,
    config.paths.styles.src,
    config.paths.views.base,
    config.paths.views.app
  ], 
  gulp.series('styles','scripts','viewsBase','viewsApp'))
  .on('change', bs.reload);
}

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.sync = sync;
exports.viewsBase = viewsBase;
exports.viewsApp = viewsApp;
exports.sounds = sounds;

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.series(clean, gulp.parallel(styles, scripts, sounds));

/*
 * You can still use `gulp.task` to expose tasks
 */
gulp.task('build', build);

/*
 * Define default task that can be called by just running `gulp` from cli
 */
gulp.task('default', build);


/*
* Work with sync automatic
*/
gulp.task('sync', sync);



/*
  ** Reference: https://github.com/gulpjs/gulp/tree/4.0
*/
