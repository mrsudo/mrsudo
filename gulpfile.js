const gulp    = require('gulp'),
      gulpif  = require('gulp-if'),
      pug     = require('gulp-pug'),
      source  = require('vinyl-source-stream');

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
gulp.task('build-css', () => {
    gulp.src(dir.node + "normalize.css/normalize.css")
        .pipe(gulp.dest(dir.build + "/css"));
    return gulp.src(dir.source + "/stylesheets/**.scss")
        .pipe(
            sass({includePaths: bourbon, outputStyle: 'compressed', sourcemap:true})
                .on('error', sass.logError)
        )
        .pipe(gulp.dest(dir.build + "/css"));
});

gulp.task('build-js', () => {
    return gulp.src(dir.source + "/**/*.ts")
        .pipe(ts(tsProject))
        .pipe(gulp.dest(dir.build + "/app"));
});

gulp.task('build-pug', () => {
    return gulp.src(dir.source + "/views/**/*.pug")
        .pipe(pug())
        .pipe(gulpif((file) => file.path.match(/\/index.html$/),
                     gulp.dest(dir.build),
                     gulp.dest(dir.build + "/views")));
});

gulp.task('bundle-js', () => {
    return browserify({basedir: dir.source})
        .add("app.ts")
        .plugin(tsify)
        .bundle()
        .on('error', (err) => { console.error(err.toString()); })
        .pipe(source("app.js"))
        .pipe(gulp.dest(dir.build + "/app"));
});

gulp.task('watch', () => {
    // TODO livereloading plugin
    gulp.watch("src/**/*.ts", ['build-js']);
    gulp.watch("src/views/**/*.pug", ['build-pug']);
    gulp.watch("src/stylesheets/**/*.scss", ['build-css']);
});


// Default task
gulp.task('default', ['build-js', 'build-css', 'build-pug']);
