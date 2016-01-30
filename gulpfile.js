var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify"),
    path = require('path');

var paths = {
    webroot: path.join(process.cwd(), "client")
};


paths.appJs = [
    path.join(paths.webroot, "components/**/*.initialize.js"),
    path.join(paths.webroot, "components/**/*.directive.js"),
    path.join(paths.webroot, "components/**/*.factory.js"),
    path.join(paths.webroot, "components/**/*.filter.js"),
    path.join(paths.webroot, "components/**/*.controller.js"),
    path.join(paths.webroot, "components/app.js")
];

paths.appCss = path.join(paths.webroot, "css/**/*.css");

paths.vendorJs = [
    path.join(paths.webroot, "lib/jquery/dist/jquery.js"),
    path.join(paths.webroot, "lib/bootswatch-dist/js/bootstrap.js"),
    path.join(paths.webroot, "lib/moment/moment.js"),
    path.join(paths.webroot, "lib/angular/angular.js"),
    path.join(paths.webroot, "lib/angular-messages/angular-messages.js"),
    path.join(paths.webroot, "lib/angular-ui-router/release/angular-ui-router.js"),
    path.join(paths.webroot, "lib/angular-bootstrap-datetimepicker/src/js/datetimepicker.js"),
    path.join(paths.webroot, "lib/ng-dialog/js/ngDialog.js"),
    path.join(paths.webroot, "lib/satellizer/satellizer.js"),
    path.join(paths.webroot, "lib/angular-toastr/dist/angular-toastr.tpls.js")
];

paths.vendorCss = [
    path.join(paths.webroot, "lib/bootswatch-dist/css/bootstrap.css"),
    path.join(paths.webroot, "lib/font-awesome/css/font-awesome.css"),
    path.join(paths.webroot, "lib/angular-bootstrap-datetimepicker/src/css/datetimepicker.css"),
    path.join(paths.webroot, "lib/ng-dialog/css/ngDialog.css"),
    path.join(paths.webroot, "lib/ng-dialog/css/ngDialog-theme-default.css"),
    path.join(paths.webroot, "lib/ng-dialog/css/ngDialog-theme-plain.css"),
    path.join(paths.webroot, "lib/angular-toastr/dist/angular-toastr.css")
];

paths.dist = path.join(paths.webroot, "dist/*");
paths.concatAppJsDest = path.join(paths.webroot, "dist/app.js");
paths.concatAppCssDest = path.join(paths.webroot, "dist/app.css");
paths.concatVendorJsDest = path.join(paths.webroot, "dist/vendor.js");
paths.concatVendorCssDest = path.join(paths.webroot, "dist/vendor.css");


// Clean dist directory
gulp.task("clean", function (cb) {
    rimraf(paths.dist, cb);
});

// Minify js & css files
gulp.task("min:js", function () {
    gulp.src(paths.appJs, { base: "." })
        .pipe(concat(paths.concatAppJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:vendorJsMin", function () {
    gulp.src(paths.vendorJs, { base: "." })
        .pipe(concat(paths.concatVendorJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    gulp.src([paths.appCss])
        .pipe(concat(paths.concatAppCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min:vendorCssMin", function () {
    gulp.src(paths.vendorCss)
        .pipe(concat(paths.concatVendorCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css", "min:vendorJsMin", "min:vendorCssMin"]);

// Concat js & css files for debugging
gulp.task("concat:js", function () {
    gulp.src(paths.appJs, { base: "." })
        .pipe(concat(paths.concatAppJsDest))
        .pipe(gulp.dest("."));
});

gulp.task("concat:vendorJsDebug", function () {
    gulp.src(paths.vendorJs, { base: "." })
        .pipe(concat(paths.concatVendorJsDest))
        .pipe(gulp.dest("."));
});

gulp.task("concat:css", function () {
    gulp.src([paths.appCss])
        .pipe(concat(paths.concatAppCssDest))
        .pipe(gulp.dest("."));
});

gulp.task("concat:vendorCssDebug", function () {
    gulp.src(paths.vendorCss)
        .pipe(concat(paths.concatVendorCssDest))
        .pipe(gulp.dest("."));
});

gulp.task("concat", ["concat:js", "concat:css", "concat:vendorJsDebug", "concat:vendorCssDebug"]);

// Watch for changes in the client app directory
gulp.task("watch", function () {
    gulp.watch([paths.appJs, paths.appCss], ['concat']);
});
