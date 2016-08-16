import { ensureArray } from "DEGJS/objectUtils";

let moduleLoader = function(options) {

    let settings,
        defaults = {
            loadImmediately: true,
            moduleDataAttr: 'data-module'
        };

    function init() {
        settings = Object.assign({}, defaults, options);

        if (settings.loadImmediately) {
            let elsWithModules = Array.from(document.querySelectorAll('[' + settings.moduleDataAttr + ']'));
            loadModules(elsWithModules);
        }
    };

    function loadModules(els) {
        els = ensureArray(els);

        els.forEach(function(el) {
            let module = el.getAttribute(settings.moduleDataAttr),
                props = {
                    'containerElement': el
                };

            System.import(module).then(function(mod) {
                mod.default(props);
            });
        });
    };

    init();

    return {
        load: loadModules;
    };

};

export default moduleLoader;