"use strict";

var through = require("through2");
var uglifyjs = require("uglify-js");

var annoRe = /<!--[\s\S]*?-->|(?:\/\*[\s\S]*?\*\/)*/g;
var tagStartRe = /(?:<[a-z-0-9]+)$/i;

// ignore script type
var ignoreScriptTypes = [
  "text/template",
  "x-tmpl-mustache"
];

/**
 * compressed html
 * @param nonote    remove annotation or not
 * @returns {*}
 */
var minify = function(nonote) {
  var typeIgnoreRe = new RegExp(ignoreScriptTypes.join("|").replace(/\//g, "\\/"));

  var _transform = function(file, encoding, done) {
    if (!file || !file.contents) return done();

    var str = file.contents.toString();
    var count = str.length + 1;
    var nline = "";
    var nstr = "";
    var index, ref, scripts;

    var scriptStart = false;

    // javascript collector
    var scol = [];

    //remove annotation like <!--XX--> or /**/
    if (!nonote) str = str.replace(annoRe, '');

    while (count-- > 0) {
      index = str.length - count;
      ref = str.charAt(index);

      //read file line by line
      if (ref.match(/\r|\n/) || index == str.length) {
        nline = nline.trim();

        if (!nline) continue;

        //template script filter
        if (nline.match(/^<script[^>]*?>$/g) && !nline.match(typeIgnoreRe)) {
          nstr += nline;
          scriptStart = true;
        } else if (scriptStart && nline.match(/^<\/script>$/g)) {
          scripts = scol.join("\n");
          scol.length = 0;
          scriptStart = false;

          //use uglifyjs to compressed the js in the html
          try {
            //console.log(scripts)
            nstr += uglifyjs.minify(scripts, {fromString: true}).code + nline;
          } catch (e) {
            console.log(e)
            nstr += scripts + nline;
          }

        } else if (scriptStart) {
          scol.push(nline);
        } else {

          if (tagStartRe.test(nstr)) {
            nstr += " ";
          }

          nstr += nline;
        }

        nline = "";
      } else {
        nline += ref;
      }
    }

    file.contents = new Buffer(nstr);

    done(null, file);
  };

  return through.obj(_transform);
};

module.exports = minify;