"use strict";

var through = require("through2");
var uglifyjs = require("uglify-js");

/**
 * compressed html
 * @param nonote    remove annotation or not
 * @returns {*}
 */
var minify = function(nonote){
    var _transform = function(file, encoding, done){
        var str = file.contents.toString();
        var count = str.length + 1;
        var text = "";
        var nstr = "";
        var scriptStart = false;
        var scriptCollector = "";

        //remove annotation like <!--XX--> or /**/
        if (!nonote) str = str.replace(/<!--[\s\S]*?-->|(?:\/\*[\s\S]*?\*\/)*/g, '');

        while (count-- > 0) {
            var index = str.length - count;

            var ref = str.charAt(index);

            //read file line by line
            if (ref.match(/\r|\n/) || index == str.length) {
                text = text.replace(/^\s+|\s+$/g, '');

                //template script filter
                if (text.match(/^<script[a-zA-Z="'/ -]*>$/g) && !text.match(/text\/template|x-tmpl-mustache/g)) {
                    nstr += text;
                    scriptStart = true;
                } else if (scriptStart && text.match(/^<\/script>$/g)) {
                    //use uglifyjs to compressed the js in the html
                    try {
                        nstr += uglifyjs.minify(scriptCollector, {fromString: true}).code + text;
                    } catch (e) {
                        nstr += scriptCollector + text;
                    }
                    scriptCollector = "";
                    scriptStart = false;
                } else if (scriptStart) {
                    scriptCollector += text + "\r\n";
                } else {
                    nstr += text;
                }

                text = "";
            } else {
                text += ref;
            }
        }

        file.contents = new Buffer(nstr);

        this.push(file);
        done();
    };

    return through.obj(_transform());
};

module.exports = minify;