# moduleLoader
Whenever possible, it's best to bundle modules during development. However, in certain situations (such as a restrictive CMS, or when loading JavaScript after a specific user interaction), it may be necessary to load a module asynchronously at runtime.

The moduleLoader module does exactly that, either on page load or on demand via an HTML attribute.

## Install
moduleLoader is an ES6 module. Consequently, you may need a transpiler ([Babel](https://babeljs.io) is a nice one) to compile moduleLoader into compatible Javascript for your runtime environment.

If you're using NPM, you can install moduleLoader with the following command:

```
$ npm install @degjs/module-loader
```

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
import moduleLoader from "@degjs/module-loader";

moduleLoader();
```

### Option B: Load modules on demand
moduleLoader uses the [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) API to watch for elements with `data-module` attributes that are added to the DOM by JavaScript after the page is loaded.  
```js
import moduleLoader from "@degjs/module-loader";

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
Options: `auto, system, esm`
Default: `auto`

#### options.basePath
Type: `String`   
The base path of the JS module. This can be overridden at the element level by adding a `data-basepath` attribute to the element.
Default: `/js/`

#### options.filenameSuffix
Type: `String`   
The suffix of the JS module being loaded. This can be overridden at the element level by adding a `data-suffix` attribute to the element.
Default: `-bundle.js`

## Browser Support
moduleLoader depends on the following browser APIs:
+ MutationObserver: [Documentation](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) | [Polyfill](https://github.com/megawac/MutationObserver.js) (Note: moduleLoader 4.0.2+ will work in IE10 without a polyfill, but dynamic module loading after the DOM is loaded will not. For IE10, either polyfill or use [moduleLoader 3.0.1](https://github.com/DEGJS/moduleLoader/tree/3.0.1))

To support legacy browsers, you'll need to include polyfills for the above APIs. 
