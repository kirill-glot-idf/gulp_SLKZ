var gulp = require("gulp"),
  sourcemaps = require("gulp-sourcemaps"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync"),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglifyjs"),
  babel = require("gulp-babel"),
  csso = require("gulp-csso");
  minify = require('gulp-minify');
  rename = require("gulp-rename"),
  del = require("del"),
  imagemin = require("gulp-imagemin"),
  pngquant = require("imagemin-pngquant"),
  cache = require("gulp-cache"),
  gsmq = require("gulp-group-css-media-queries"),
  injectPartials = require("gulp-inject-partials"),
  autoprefixer = require("gulp-autoprefixer"),
  include = require('gulp-include'),
  replace = require("gulp-replace");

gulp.task("index", function () {
  return gulp
    .src("./app/view/*.html")
    .pipe(injectPartials())
    .pipe(
      rename(function (opt) {
        opt.basename = opt.basename.replace(/^_/, "");
        return opt;
      })
    )
    .pipe(gulp.dest("./app"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("sass", function () {
  return gulp
      .src("app/scss/app.scss")
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(gsmq())
      // .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
      .pipe(autoprefixer(["last 2 versions"], { cascade: true }))
      .pipe(csso())
      .pipe(rename({ suffix: ".min" }))
      .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("app/css"))
      .pipe(browserSync.reload({ stream: true }));
});


gulp.task("scripts", function () {
  return gulp
    .src([
      "app/js/app.js"
    ])
    .pipe(include())
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("app/js"));
});

gulp.task("scriptsConcat", function () {
  return gulp
    .src([
      /** libs */
      // 'node_modules/jquery/dist/jquery.min.js',
      // "node_modules/swiper/swiper-bundle.min.js",

      "app/js/app.min.js",
    ])
    .pipe(concat("app.min.js"))
    .pipe(gulp.dest("app/js"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task("browser-sync", function () {
  browserSync({
    server: {
      baseDir: "app",
	},
	notify: false,
    // tunnel: true,
  });
});

gulp.task("clean", async function () {
  return del.sync("dist");
});

gulp.task("img", function () {
  return gulp
    .src("app/img/**/*")
    .pipe(
      cache(
        imagemin({
          interlaced: true,
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          use: [pngquant()],
        })
      )
    )
    .pipe(gulp.dest("dist/img"));
});

gulp.task("prebuild", async function () {
  var buildCss = gulp.src("app/css/*").pipe(gulp.dest("dist/css"));

  var buildFonts = gulp.src("app/fonts/**/*").pipe(gulp.dest("dist/fonts"));

  var buildJs = gulp.src("app/js/app.min.js").pipe(gulp.dest("dist/js"));

  var buildHtml = gulp.src("app/*.html").pipe(gulp.dest("dist"));

  var buildPhp = gulp.src("app/*.php").pipe(gulp.dest("dist"));
});

gulp.task("clear", function (callback) {
  return cache.clearAll();
});

gulp.task("checkupdate", function () {
  gulp.watch("app/scss/**/*.scss", gulp.parallel("sass"));
  gulp.watch("app/view/**/*.html", gulp.parallel("index"));
  gulp.watch(["app/js/*.js", "!app/js/*.min.js"], gulp.series("scripts", "scriptsConcat"));
});

gulp.task('html_code', function() {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task(
  "watch",
  gulp.parallel(
    "sass",
    "scriptsConcat",
    "scripts",
    "browser-sync",
    "index",
    "checkupdate",
    "html_code"
  )
);

gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.parallel(
      "index",
      "img",
      "sass",
      gulp.series("scripts", "scriptsConcat")
    ),
    "prebuild"
  )
);
