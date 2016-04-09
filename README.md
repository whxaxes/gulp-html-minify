# gulp-html-minify

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url]

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

[npm-url]: https://npmjs.org/package/gulp-html-minify
[npm-image]: http://img.shields.io/npm/v/gulp-html-minify.svg
[travis-url]: https://travis-ci.org/whxaxes/gulp-html-minify
[travis-image]: http://img.shields.io/travis/whxaxes/gulp-html-minify.svg
[coveralls-url]: https://coveralls.io/r/whxaxes/gulp-html-minify
[coveralls-image]: https://coveralls.io/repos/github/whxaxes/gulp-html-minify/badge.svg