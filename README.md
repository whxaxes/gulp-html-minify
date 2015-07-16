# gulp-html-minify

A simple gulp plugin, used to compressed html

## Install
    npm install gulp-html-minify

## Usage:
```
var htmlminify = require("gulp-html-minify");
gulp.task('build-html' , function(){
    return gulp.src("./html-init/**/*.html")
        .pipe(htmlminify())
        .pipe(gulp.dest("./html"))
});
```
