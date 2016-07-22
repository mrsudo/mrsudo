const gulp    = require("gulp"),
      util    = require("gulp-util"),
      changed = require("gulp-changed"),
      merge   = require("merge-stream");
// pug
const pug     = require("gulp-pug");
// sass
const sass    = require("gulp-sass"),
      bourbon = require("node-bourbon").includePaths;
// typescript
const ts         = require("gulp-typescript"),
      tsProject  = ts.createProject("tsconfig.json");
// js
const browserify = require("browserify"),
      source     = require("vinyl-source-stream"),
      buffer     = require("vinyl-buffer"),
      uglify     = require("gulp-uglify");

//
const dir = {
    build:  "public/",
    source: "src/",
    node:   "node_modules/"
};


// Tasks
gulp.task("sass", () => {
    const dest = dir.build + "/css";

    let norm = gulp.src("normalize.css/normalize.css", {cwd: dir.node})
        .pipe(gulp.dest(dest));

    let scss = gulp.src("stylesheets/**.scss", {cwd: dir.source})
        .pipe(changed(dest, {extension: ".scss"}))
        .pipe(sass({
                includePaths: bourbon,
                outputStyle: "compressed",
                sourcemap: true
            }).on("error", sass.logError))
        .pipe(gulp.dest(dest));

    return merge(norm, scss);
});

gulp.task("ts", () => {
    let src = gulp.src(["typings/index.d.ts", dir.source + "**/*.ts"])
        .pipe(ts(tsProject))
        .pipe(gulp.dest(dir.build + "app/"));

    if (util.env.release) {
        let brs = browserify(dir.build + "app/app.js")
            .bundle()
            .on("error", (err) => { console.error(err.toString()); })
            .pipe(source("app.js"))
            .pipe(buffer())
            .pipe(uglify())
            .pipe(gulp.dest(dir.build + "/app/"));

        return merge(src, brs);
    }

    return src;
});

gulp.task("pug", () => {
    let locals = {locals: {release: util.env.release}};

    let index = gulp.src("views/index.pug", {cwd: dir.source})
        .pipe(changed(dir.build, {extension: ".pug"}))
        .pipe(pug(locals))
        .pipe(gulp.dest(dir.build));

    let views = gulp.src(["views/**/*.pug", "!views/index.pug"], {cwd: dir.source, base: dir.source})
        .pipe(changed(dir.build, {extension: ".pug"}))
        .pipe(pug(locals))
        .pipe(gulp.dest(dir.build));

    return merge(index, views);
});

gulp.task("watch", () => {
    // TODO add browserSync
    gulp.watch(dir.source + "**/*.ts", ["ts"]);
    gulp.watch(dir.source + "**/*.pug", ["pug"]);
    gulp.watch(dir.source + "stylesheets/**/*.scss", ["sass"]);
});


// Default task
gulp.task("default", ["ts", "sass", "pug"]);
