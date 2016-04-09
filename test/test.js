var htmlminify = require("../");
var vfs = require("vinyl-fs");
var assert = require('assert');
var fs = require('fs');

describe('/test/test.js', function(done){
  it('should run without error', function(){
    vfs.src('./ref/*.html')
      .pipe(htmlminify())
      .pipe(vfs.dest("./dist/"))
      .on('end', function(){
        done();
      });
  });
});