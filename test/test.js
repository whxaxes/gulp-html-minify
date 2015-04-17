var htmlminify = require("../");
var vfs = require("vinyl-fs");

vfs.src('./ref/*.html')
    .pipe(htmlminify())
    .pipe(vfs.dest("./dist/"));
