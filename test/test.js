var htmlminify = require("../");
var vfs = require("vinyl-fs");

vfs.src('./ref/index.html')
    .pipe(htmlminify())
    .pipe(vfs.dest("./dist/"));
