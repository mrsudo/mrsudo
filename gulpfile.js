var gulp = require('gulp');

var appdir = "public/",
    srcdir = "src/";

// Pug
var pug = require('gulp-pug');

// Sass
var sass = require('gulp-sass');

// Typescript
var ts = require('gulp-typescript'),
    tsProject = ts.createProject('tsconfig.json');


//
gulp.task('build-css', () => {
    return gulp.src(srcdir + "/stylesheets/**.scss")
        .pipe(sass().on('error', sass.logError))
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
    gulp.watch("src/**/*.pug", ['build-pug']);
    gulp.watch("src/stylesheets/**/*.scss", ['build-css']);
});


// Default task
gulp.task('default', ['build-ts', 'build-css', 'build-pug']);
