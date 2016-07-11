var gulp = require('gulp'),
    pug  = require('gulp-pug'),
    sass = require('gulp-sass'),
    bourbon = require('node-bourbon').includePaths,
    ts   = require('gulp-typescript');

var appdir = "public/",
    srcdir = "src/";

// Typescript
var tsProject = ts.createProject('tsconfig.json');

//
gulp.task('build-css', () => {
    return gulp.src(srcdir + "/stylesheets/**.scss")
        .pipe(sass({includePaths: [].concat(bourbon), outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest(appdir + "/css"));
});

gulp.task('build-js', () => {
    return gulp.src(srcdir + "/**/*.ts")
        .pipe(ts(tsProject))
        .pipe(gulp.dest(appdir + "/app"));
});

gulp.task('build-pug', () => {
    return gulp.src(srcdir + "/views/**/*.pug")
        .pipe(pug())
        .pipe(gulp.dest(appdir + "/views"));
});

gulp.task('watch', () => {
    // TODO livereloading plugin
    gulp.watch("src/**/*.ts", ['build-js']);
    gulp.watch("src/views/**/*.pug", ['build-pug']);
    gulp.watch("src/stylesheets/**/*.scss", ['build-css']);
});


// Default task
gulp.task('default', ['build-js', 'build-css', 'build-pug']);
