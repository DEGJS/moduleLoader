import {ensureArray} from 'DEGJS/objectUtils';

const moduleLoader = function(options) {

    const bodyEl = document.body;
    const defaults = {
        moduleDataAttr: 'data-module'
    };
    const mutationConfig = {
        childList: true,
        attributes: false,
        characterData: false
    };
    const observer = new MutationObserver(onMutation);
    let settings;

    function init() {
        settings = Object.assign({}, defaults, options);
        observer.observe(bodyEl, mutationConfig);
    }

    function onMutation(mutationsList) {
        for (const mutation of mutationsList) {
            const moduleEls = getModuleEls(mutation);
            loadModules(moduleEls);
        }
    }

    function getModuleEls(mutation) {
        const addedEls = [...mutation.addedNodes];
        return addedEls.filter(el => el.dataset && typeof el.dataset.module !== 'undefined');
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

};

export default moduleLoader;