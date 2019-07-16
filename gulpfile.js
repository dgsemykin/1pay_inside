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
var runSequence = require('run-sequence');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var htmlmin = require('gulp-htmlmin');

// var $ = gulpLoadPlugins();
var filter = require('gulp-filter');
var reload = browserSync.reload;

var dev = true;

gulp.task('views', function() {
    return gulp.src('src/templates/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('.tmp'))
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
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'],
        }))
        .pipe(minifyCSS())
        .pipe(gulp.dest('.tmp/css'))
        .pipe(reload({ stream: true }));
});

gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(gulp.dest('.tmp/js'))
        .pipe(reload({ stream: true }));
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('.tmp/fonts'));
});

gulp.task('img', function() {
    return gulp.src('src/img/**/*', { base: 'src' })
        .pipe(gulp.dest('.tmp'));
});

gulp.task('files', function() {
    return gulp.src('src/files/**/*', { base: 'src' })
        .pipe(gulp.dest('.tmp'));
});

gulp.task('clean', del.bind(null, ['.tmp']));

gulp.task('serve', () => {
    runSequence(['clean'], ['views', 'css', 'js', 'fonts', 'img', 'files'], () => {
        browserSync.init({
            notify: false,
            open: false,
            port: 9000,
            server: {
                baseDir: ['.tmp', 'src'],
                // routes: {
                //     '/bower_components': 'bower_components'
                // }
            }
        });

        gulp.watch([
            'src/*.html',
            'src/images/**/*',
            '.tmp/fonts/**/*'
        ]).on('change', reload);

        gulp.watch('src/**/*.pug', ['views']);
        gulp.watch('src/styles/**/*.less', ['css']);
        // gulp.watch('src/scripts/**/*.js', ['scripts']);
        gulp.watch('src/js/**/*.js', ['js']);
        gulp.watch('src/fonts/**/*', ['fonts']);
        // gulp.watch('bower.json', ['wiredep', 'fonts']);
    });
});

gulp.task('extras', () => {
    return gulp.src([
        'src/*.*',
        '!src/*.html',
        '!src/*.pug'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'));
});

gulp.task('html', ['clean'], () => {
    return gulp.src(['app/*.html', '.tmp/*.html'])
        .pipe(useref({ searchPath: ['.tmp', 'src', '.'] }))
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});



gulp.task('default', ['views', 'css', 'js', 'fonts', 'img', 'files']);