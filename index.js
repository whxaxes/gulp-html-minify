var through = require("through2");
var uglifyjs = require("uglify-js");

module.exports = function(){
    return through.obj(function(file, encoding, done) {
        var str = String(file.contents);
        var count = str.length+1;
        var text = "";
        var nstr = "";
        var scriptStart = false;
        var scriptCollector = "";

        while(count-- > 0){
            var index = str.length-count;

            var ref = str.charAt(index);
            //逐行读取
            if((ref=='\r' && str.charAt(index+1)=='\n') || index==str.length){
                text = text.replace(/(^(\s+))|((\s+)$)/g , '');

                if (text.match(/^<script[\s\S]*>$/g) && !text.match(/(text\/template)|x-tmpl-mustache/g)) {
                    nstr += text;
                    scriptStart = true;
                } else if (scriptStart && text.match(/^<\/script>$/g)) {
                    try{
                        nstr += uglifyjs.minify(scriptCollector , {fromString:true}).code + text;
                    }catch (e){
                        nstr += scriptCollector + text;
                    }
                    scriptStart = false;
                } else if (scriptStart) {
                    scriptCollector += text + "\r\n";
                } else {
                    nstr += text;
                }

                text = "";
                count--;
            }else {
                text += ref;
            }
        }

        file.contents = new Buffer(nstr);

        this.push(file);
        done();
    });
}