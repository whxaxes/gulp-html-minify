# gulp-html-minify

自用，简单html压缩工具gulp插件 html minify

###how to use:

    var htmlminify = require("gulp-html-minify");
    gulp.task('build-html' , function(){
        return gulp.src("./html-init/**/*.html")
            .pipe(htmlminify())
            .pipe(gulp.dest("./html"))
    });
