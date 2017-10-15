'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var angularFileSort = require('gulp-angular-filesort');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var bowerNormalizer = require('gulp-bower-normalize');
var uglify = require('gulp-uglify');
var concatCss = require('gulp-concat-css');
var mergeStream = require('merge-stream');
var cleanCSS = require('gulp-clean-css');
// -------------------------------------------------------------------
gulp.task('copyLibs', function() {
    return gulp.src(mainBowerFiles(), {base: './bower_components'})
        .pipe(bowerNormalizer({bowerJson: './bower.json'}))
        .pipe(gulp.dest('libs'));
});
// -------------------------------------------------------------------

gulp.task('libs', function () {
   gulp.src('js/*.js')
       .pipe(angularFileSort())
       .pipe(concat('libs.js'))
       .pipe(uglify())
       .pipe(gulp.dest('app/dist/src'));
});

gulp.task('cssLibs', function () {
   return gulp.src('app/src/css/libs/**/*.css')
       .pipe(gulp.dest('app/dist/css/'));
});

gulp.task('images', function () {
    return gulp.src('app/src/images/*')
        .pipe(gulp.dest('app/dist/'))
});

gulp.task('appModules', function(){
    return gulp.src('app/src/js/**/*.js')
        .pipe(ngAnnotate())
        .pipe(angularFileSort())
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('app/dist/src'));
});

gulp.task('css', function(){
    return gulp.src('app/src/css/mystyle.css')
        .pipe(concat('style.css'))
        .pipe(gulp.dest('app/dist/src/'));
});


gulp.task('templates', function () {
    return gulp.src('app/src/templates/**/*.html')
        .pipe(templateCache('template.js', {
            module: 'quizApp',
            root: 'app/src/templates/'
        }))
        .pipe(gulp.dest('app/dist/src'));
});

// This Code is For Copying the app file
gulp.task('appMain', function () {
   return gulp.src('app/app.js')
       .pipe(gulp.dest('app/dist'))
});



// This Code is for Index File

gulp.task('index', function () {
   return gulp.src('app/index.html')
       .pipe(gulp.dest('app/dist'));
});

gulp.task('watch', function () {
   gulp.watch('app/src/js/**/*.js', ['appModules']);
   gulp.watch('app/src/css/*.css', ['css']);
   gulp.watch('app/src/templates/**/*.html', ['templates']);
});

gulp.task('default', ['appModules','templates','appMain','index','css','watch']);

gulp.task('build', ['libs','appModules','css','cssLibs','templates','appMain','index']);
