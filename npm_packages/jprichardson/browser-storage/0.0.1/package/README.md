browser-storage
=============

Normalizes `localStorage` usage between Browser and Node.js. May include `sessionStorage` support in the future.


Why?
----

You probably will almost never need this. Why would you want to use it then? Let's say that you're developing a component that you want to use in both Node.js and the browser (via Browserify) and you want an easy way to persist state. To persist state, on Node.js your options are endless. On the browser you have the option of cookies (awful idea), local storage, web sql, file api, indexeddb. Other than cookies, local storage is the one that's most widely available. This package just normalizes the behavior of local storage between the two environment since local storage is not availabe on Node.js.


Usage
-----

    npm install --save browser-storage


Example
-------

```js
var bs = require('browser-storage')

bs.setItem('name', 'jp')
console.log(bs.getItem('name')) // => jp
```

Credits
--------




License
-------

MIT

