var htmlminify = require("../");
var vfs = require("vinyl-fs");

vfs.src('./ref/test.html')
    .pipe(htmlminify())
    .pipe(vfs.dest("./dist/"));
