/**
 * micro-loader.js
 * @authors hechangmin (hechangmin@gmail.com)
 * @date    2014-07-17
 *
 * useage <script src='micro-loader.js' id='loader-node' async='false' defer='true' data-main='app.js'></script>
 */

(function(){

    var fnCache = {};
    var head    = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
    var base    = head.getElementsByTagName("base")[0];

    function checkType(obj, type){
        return  Object.prototype.toString.call(obj) === "[object " + type + "]";
    }

    function loadJS(urls, callback) {
        var script = document.createElement('script');
        script.charset = 'utf-8';
        script.async = true;
        bindLoadEvent(script, callback);

        if(checkType(urls, 'Array')){
            var key = '_' + new Date().getTime();

            if(callback){
                fnCache[key] = callback;
                fnCache[key].count = 0;
            }

            for(var i = 0, nLen = urls.length; i < nLen; i++){
                loadJS(urls[i],(function(){
                    return function(){
                        if(fnCache[key]){
                            if(++fnCache[key].count == nLen){
                                fnCache[key]();
                            }
                        }
                    };
                })(key));
            }
        }else{
            script.src = urls;
            // IE6 页面存在一个自闭合的base节点，会把其“下面”所有的元素都拷到它内部。
            // @see http://blog.csdn.net/cheng5128/article/details/5605988
            // bug info link : http://blogs.msdn.com/b/ie/archive/2005/08/29/457667.aspx
            base ? head.insertBefore(script, base) : head.appendChild(script);
        }
    }

    function bindLoadEvent(script, callback) {
        script.onload = script.onreadystatechange = function() {
            if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                //memory leak in IE
                script.onload = script.onreadystatechange = null;
                // Remove the script to reduce memory leak
                if (script.parentNode) {
                    script.parentNode.removeChild(script);
                }
                script = null;
                callback && callback();
            }
        };
    }

    //auto run
    (function(){
        var el   = document.getElementById("loader-node");
        var main = el.getAttribute("data-main");
        if (main){
            setTimeout(function(){
                loadJS(main);
            });
        }
        window.loadJS = loadJS;
    })();
})();