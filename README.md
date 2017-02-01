# moduleLoader
Whenever possible, it's best to bundle modules during development. However, in certain situations (such as a restrictive CMS, or when loading JavaScript after a specific user interaction), it may be necessary to load a module asynchronously at runtime.

The moduleLoader module does exactly that, either on page load via an HTML attribute or on demand via JavaScript.

## Install
moduleLoader is an ES6 module. Consequently, you'll need an ES6 transpiler ([Babel](https://babeljs.io) is a nice one) and a module loader as part of your Javascript workflow.

If you're already using the [JSPM package manager](http://jspm.io) for your project, you can install moduleLoader with the following command:

```
$ jspm install github:DEGJS/moduleLoader
```

## Dependencies
JSPM automatically installs and configures this module's dependencies for you. However, if you manually install this module without using JSPM, you'll also need to manually install these dependencies:

* [objectUtils](https://github.com/DEGJS/objectUtils)
* moduleLoader requires [SystemJS](https://github.com/systemjs/systemjs) and will only work with v0.19.x or earlier, as it uses its `System.import()` method to load modules.

## Usage
Regardless of whether you load modules on page load or on demand, you must set the `data-module` attribute on your HTML elements:
```html
<div class="my-components my-component-1" data-module="components/myComponent1">
    Component 1
</div>

<div class="my-components my-component-2" data-module="components/myComponent2">
    Component 2
</div>
```

### Option A: Load modules on page load
```js
import moduleLoader from "DEGJS/moduleLoader";

moduleLoader();
```

### Option B: Load modules on demand
```js
import moduleLoader from "DEGJS/moduleLoader";

moduleLoader({
    loadImmediately: false
}); // Initialize moduleLoader, but disable immediate module loading

let els = Array.from(document.querySelectorAll('.my-components'));
moduleLoader.load(els);
```

## Options
#### options.loadImmediately
Type: `Boolean`   
Setting this option to `false` prevents moduleLoader from immediately loading elements on page load. Defaults to `true`.

#### options.moduleDataAttr
Type: `String`   
The name of the data attribute that defines the module to be loaded. Defaults to `data-module`.

## Methods

### load(els)
The load method will asynchronously load any modules defined on each supplied element's `data-module` attribute. Upon each successful load, an object is passed to the loaded module containing the following values:

* **containerElement:** The element from which the module was called.

**els**   
Type: `Element` or `Array`  
An element or array of elements containing `data-module` attributes.



## Browser Support

moduleLoader depends on the following browser APIs:
+ forEach: [Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) | [Polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Polyfill)
+ Array.from: [Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) | [Polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill)
+ Object.assign: [Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) | [Polyfill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill)

To support legacy browsers, you'll need to include polyfills for the above APIs.