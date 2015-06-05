"use strict";

var through = require("through2");
var uglifyjs = require("uglify-js");

module.exports = function (nonote) {
    return through.obj(function (file, encoding, done) {
        var str = file.contents.toString();
        var count = str.length + 1;
        var text = "";
        var nstr = "";
        var scriptStart = false;
        var scriptCollector = "";

        //去除注释包括html的<!--XX-->和css的/**/，js的注释由uglify处理
        if (!nonote) str = str.replace(/<!--[\s\S]*?-->|(?:\/\*[\s\S]*?\*\/)*/g, '');

        while (count-- > 0) {
            var index = str.length - count;

            var ref = str.charAt(index);

            //逐行读取
            if (ref.match(/\r|\n/) || index == str.length) {
                text = text.replace(/^\s+|\s+$/g, '');

                //防止前端模板也被当成js，因此过滤一部分，包括type="text/template"和type="x-tmpl-mustache"，若有其他需求再加
                if (text.match(/^<script[a-zA-Z="'/ -]*>$/g) && !text.match(/text\/template|x-tmpl-mustache/g)) {
                    nstr += text;
                    scriptStart = true;
                } else if (scriptStart && text.match(/^<\/script>$/g)) {
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
    });
}