var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var del = require("del");
var source = require("vinyl-source-stream2");

var browserify = require("browserify");
var reactify = require("reactify");
var watchify = require("watchify");

var src = [
  "./src/**/*",
  "!./src/__tests__",
  "!./src/__tests__/**"
];
var lib = "./lib";

gulp.task("clean", function(cb) {
  del(lib, cb);
});

gulp.task("compile", ["clean"], function() {
  return gulp.src(src)
  .pipe($.react({harmony: true}))
  .pipe(gulp.dest(lib));
});

gulp.task("default", ["compile"]);

gulp.task("watch", ["compile"], function() {
  gulp.watch(src, ["compile"]);
});
