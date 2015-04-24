# gulp-html-minify

自用插件，简单html压缩工具gulp插件 html minify

##Install
    npm install gulp-html-minify

##Usage:
    var htmlminify = require("gulp-html-minify");
    gulp.task('build-html' , function(){
        return gulp.src("./html-init/**/*.html")
            .pipe(htmlminify())
            .pipe(gulp.dest("./html"))
    });

###tips
html和css的压缩只是简单的去掉前后空格及换行符<br>
js使用uglify-js进行压缩
