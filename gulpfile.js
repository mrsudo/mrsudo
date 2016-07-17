const gulp    = require('gulp'),
      changed = require('gulp-changed'),
      rename  = require("gulp-rename"),
      source  = require('vinyl-source-stream');

// pug
const pug     = require('gulp-pug');

// sass
const sass    = require('gulp-sass'),
      bourbon = require('node-bourbon').includePaths;

// typescript
const ts         = require('gulp-typescript'),
      browserify = require('browserify'),
      tsify      = require('tsify');

var tsProject = ts.createProject('tsconfig.json');

//
const dir = {
    build:  "public/",
    source: "src/",
    node:   "node_modules/"
};


// Tasks
gulp.task('sass', () => {
    const dest = dir.build + "/css";
    gulp.src(dir.node + "normalize.css/normalize.css").pipe(gulp.dest(dest));
    return gulp.src(dir.source + "/stylesheets/**.scss")
        .pipe(changed(dest, {extension: '.scss'}))
        .pipe(
            sass({includePaths: bourbon, outputStyle: 'compressed', sourcemap:true})
                .on('error', sass.logError)
        )
        .pipe(gulp.dest(dest));
});

gulp.task('ts', () => {
    return browserify({entries: ["app.ts"], basedir: dir.source, cache: {}, packageCache: {}, plugin: [tsify]})
        .exclude("@angular/platform-browser-dynamic")
        .bundle()
        .on('error', (err) => { console.error(err.toString()); })
        .pipe(source("app.js"))
        .pipe(gulp.dest(dir.build + "/app"));

});

gulp.task('pug', () => {
    let locals = {locals: {env: process.env.ENV}};

    gulp.src(dir.source + "views/index.pug")
        .pipe(changed(dir.build, {extension: '.pug'}))
        .pipe(pug(locals))
        .pipe(gulp.dest(dir.build));

    return gulp.src([dir.source + "views/**/*.pug", "!" + dir.source + "views/index.pug"], {base: dir.source})
        .pipe(changed(dir.build, {extension: '.pug'}))
        .pipe(pug(locals))
        .pipe(gulp.dest(dir.build));
});

gulp.task('watch', () => {
    // TODO add browserSync
    gulp.watch(dir.source + "**/*.ts", ['ts']);
    gulp.watch(dir.source + "**/*.pug", ['pug']);
    gulp.watch(dir.source + "stylesheets/**/*.scss", ['sass']);
});


// Default task
gulp.task('default', ['ts', 'sass', 'pug']);
