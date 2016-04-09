var htmlminify = require("../");
var vfs = require("vinyl-fs");
var assert = require('assert');
var fs = require('fs');

describe('test/test.js', function(){

  it('should run without error', function(done){
    vfs.src(__dirname + '/ref/*.html')
      .pipe(htmlminify())
      .pipe(vfs.dest(__dirname + "/dist/"))
      .on('end', function(){
        done();
      });
  });

});

