# moduleLoader
Whenever possible, it's best to bundle modules during development. However, in certain situations (such as a restrictive CMS, or when loading JavaScript after a specific user interaction), it may be necessary to load a module asynchronously at runtime.

The moduleLoader module does exactly that, either on page load or on demand via an HTML attribute.

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
moduleLoader uses the [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) API to watch for elements with `data-module` attributes that are added to the DOM by JavaScript after the page is loaded.  
```js
import moduleLoader from "DEGJS/moduleLoader";

moduleLoader();

document.body.insertAdjacentHTML('beforeend', `
    <div class="my-components my-component-3" data-module="components/myComponent3">
        Component 3
    </div>
`);
```

Upon each successful load, an object is passed to the loaded module containing the following values:

* **containerElement:** The element from which the module was called.

## Options
#### options.moduleDataAttr
Type: `String`   
The name of the data attribute that defines the module to be loaded.  
Default: `data-module`

#### options.elToObserve
Type: `Element`   
The DOM element to observe for dynamically added elements.  
Default: `document.body`

#### options.enableObservation
Type: `Boolean`   
In some cases, you may know that no elements with modules will be added to the page after page load. Setting to `false` disables the potentially expensive mutation observer.  
Default: `true`

#### options.loadingMethod
Type: `String`   
By default, moduleLoader will attempt to load native JavaScript modules using the `import()` method, but will automatically fall back to SystemJS's `System.import()` method in unsupported browsers. This behavior can be overridden with this setting.
Options: `'auto', 'system', 'esm'`
Default: `'auto'`

## Browser Support
moduleLoader depends on the following browser APIs:
+ MutationObserver: [Documentation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) | [Polyfill](https://github.com/megawac/MutationObserver.js) (Note: moduleLoader 4.0.2+ will work in IE10 without a polyfill, but dynamic module loading after the DOM is loaded will not. For IE10, either polyfill or use [moduleLoader 3.0.1](https://github.com/DEGJS/moduleLoader/tree/3.0.1))

To support legacy browsers, you'll need to include polyfills for the above APIs. 
