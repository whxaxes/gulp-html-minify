# gulp-html-minify

自用插件，简单html压缩工具gulp插件 html minify

###how to use:

    var htmlminify = require("gulp-html-minify");
    gulp.task('build-html' , function(){
        return gulp.src("./html-init/**/*.html")
            .pipe(htmlminify())
            .pipe(gulp.dest("./html"))
    });

html和css的压缩只是简单的去前后空格以及换行符
js使用uglify-js进行压缩
