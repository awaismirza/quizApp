const gulp = require('gulp');

// Installing Gulp Plugins

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const templateCache = require('gulp-angular-templatecache');
const mainBowerFiles = require('gulp-main-bower-files');

// gulp.task - Define Tasks
// Gulp.src -- Point tofiles to use


// Get All the Template
gulp.task('templates', function(){
   gulp.src('app/src/templates/**/*.html')
       .pipe(templateCache())
       .pipe(gulp.dest('dist'));
});

gulp.task('css', function(){
        gulp.src([
        'app/bower_components/html5-boilerplate/dist/css/normalize.css',
        'app/bower_components/html5-boilerplate/dist/css/main.css',
        'app/bower_components/bootstrap/dist/css/bootstrap.css',
        'app/src/css/app.css'
        ])
            .pipe(concat('style.css'))
            .pipe(gulp.dest('dist'));
});

gulp.task('libs', function(){
    return gulp.src('bower.json')
        .pipe(mainBowerFiles())
        .pipe(concat('libs.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

//-------------------------------------------------------------------------
// Manually Added the Libraries

// gulp.task('libs', function(){
//     gulp.src([
//        'app/bower_components/angular/angular.js',
//        'app/bower_components/angular-route/angular-route.js',
//        'app/bower_components/angular-loader/angular-loader.js',
//        'app/bower_components/jquery/dist/jquery.js',
//         'app/bower_components/bootstrap/dist/js/bootstrap.js',
//        'app/bower_components/underscore/underscore.js',
//         ''
//     ])
//         .pipe(concat('libs.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist'));
// });
//-----------------------------------------------------------------------

gulp.task('app', function(){
    gulp.src('app/src/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('build', ['app', 'libs', 'templates', 'css']);

