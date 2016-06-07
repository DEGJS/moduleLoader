# moduleLoader
Asynchronously loads ES6 modules via an HTML attribute.

## Sample Usage
First, add the module as a data attribute:
``` html
<div class="component" data-module="path/to/module">
```

Then, get the referenced element from within your module:
``` javascript
let module = function(props) {
	let element = props.containerElement
};
```

## Browser Support

moduleLoader depends on the following browser APIs:
+ [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

To support legacy browsers, you'll need to include polyfills for the above APIs.