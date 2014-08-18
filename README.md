#micro-loader#

Mini loader, used to load the JavaScript file.

##usage##

-----------------
```html
<script src='micro-loader.min.js' id='loader-node' async='false' defer='true' data-main='app.js'></script>
```

```js
var jsFiles = [
    'js/test1.js',
    'js/test2.js',
    'js/test3.js',
    'js/test4.js'
];

loadJS(jsFiles, callback);
```
-----------------
* loadJS  // One or list.


##License##

Released under the MIT license

_*[hechangmin@gmail.com](mailto://hechangmin@gmail.com)*_
