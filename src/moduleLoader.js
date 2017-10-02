import {ensureArray} from 'DEGJS/objectUtils';

let moduleLoader = function(options) {

    const defaults = {
        loadImmediately: true,
        moduleDataAttr: 'data-module'
    };
    let settings;

    function init() {
        settings = Object.assign({}, defaults, options);

        if (settings.loadImmediately) {
            const elsWithModules = Array.from(document.querySelectorAll(`[${settings.moduleDataAttr}]`));
            loadModules(elsWithModules);
        }
    }

    function loadModules(els) {
        els = ensureArray(els);

        els.forEach(el => {
            const module = el.getAttribute(settings.moduleDataAttr);
            const props = {
                'containerElement': el
            };
            System.import(module).then(mod => mod.default(props));
        });
    }

    init();

    return {
        load: loadModules
    };

};

export default moduleLoader;