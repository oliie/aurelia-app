var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var assign = Object.assign || require('object.assign');
var notify = require('gulp-notify');
var typescript = require('gulp-tsb');

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
var typescriptCompiler = typescriptCompiler || null;
gulp.task('build-system', function () {
    if (!typescriptCompiler) {
        typescriptCompiler = typescript.create(require('../../tsconfig.json').compilerOptions);
    }
    return gulp.src(paths.dtsSrc.concat(paths.source))
        .pipe(plumber())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(typescriptCompiler())
        .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '/src' }))
        .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
// gulp.task('build-html', function () {
//     return gulp.src(paths.html)
//         .pipe(changed(paths.output, { extension: '.html' }))
//         .pipe(gulp.dest(paths.output));
// });

gulp.task('build-pug', function () {
    return gulp.src(paths.pug)
        .pipe(pug())
        .pipe(changed(paths.output, { extension: '.html' }))
        .pipe(gulp.dest(paths.output));
});

// copies changed css files to the output directory
gulp.task('build-css', function () {
    return gulp.src(paths.css)
        .pipe(changed(paths.output, { extension: '.css' }))
        .pipe(gulp.dest(paths.output));
});

gulp.task('build-sass', function () {
    return gulp.src(paths.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(changed(paths.output, { extension: '.css' }))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('styles/'));
})

// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function (callback) {
    return runSequence(
        'clean',
        ['build-system', 'build-pug', 'build-css', 'build-sass'],
        callback
    );
});
