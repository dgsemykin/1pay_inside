var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var del = require('del');
var autoprefixer = require('gulp-autoprefixer');
var wiredep = require('wiredep').stream;
var runSequence = require('gulp4-run-sequence');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');
var importCSS = require('gulp-import-css');

// var $ = gulpLoadPlugins();
var filter = require('gulp-filter');
var reload = browserSync.reload;

var dev = true;

gulp.task('views', function() {
    return gulp.src('src/templates/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('build'))
        .pipe(reload({ stream: true }));
});

gulp.task('css', function() {
    var cssFiles = [
        'src/styles/chat/chat.less',
        'src/styles/payment-form/payment-form.less',
        'src/styles/personal/personal.less',
    ];

    return gulp.src(cssFiles)
        .pipe(less())
        .pipe(importCSS())
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('build/css'))
        .pipe(reload({ stream: true }));
});

gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('build/js'))
        .pipe(reload({ stream: true }));
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*', { base: 'src' })
        .pipe(gulp.dest('build'));
});

gulp.task('files', function() {
    return gulp.src('src/files/**/*', { base: 'src' })
        .pipe(gulp.dest('build'));
});

gulp.task('clean', del.bind(null, ['build']));

gulp.task('serve', () => {
    runSequence(gulp.series('clean'), gulp.series('views', 'css', 'js', 'fonts', 'img', 'files'), () => {
        browserSync.init({
            notify: false,
            open: false,
            port: 9000,
            server: {
                baseDir: ['build', 'src'],
                // routes: {
                //     '/bower_components': 'bower_components'
                // }
            }
        });

        gulp.watch([
            'src/*.html',
            'src/images/**/*',
            'build/fonts/**/*'
        ]).on('change', reload);

        gulp.watch('src/**/*.pug', gulp.series('views'));
        gulp.watch('src/styles/**/*.less', gulp.series('css'));
        // gulp.watch('src/scripts/**/*.js', ['scripts']);
        gulp.watch('src/js/**/*.js', gulp.series('js'));
        gulp.watch('src/fonts/**/*', gulp.series('fonts'));
        // gulp.watch('bower.json', ['wiredep', 'fonts']);
    });
});

gulp.task('extras', () => {
    return gulp.src([
        'src/*/*.*',
        '!src/*.html',
        '!src/*.pug'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('html', gulp.parallel('clean'), () => {
    return gulp.src(['app/*.html', 'build/*.html'])
        .pipe(useref({ searchPath: ['build', 'src', '.'] }))
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});



gulp.task('default', gulp.series('views', 'css', 'js', 'fonts', 'img', 'files'));