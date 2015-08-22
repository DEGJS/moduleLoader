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
	let element = props.containerElement,
};
```

## Revision History
* **1.0.0:** First commit.