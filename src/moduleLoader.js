import {ensureArray} from 'DEGJS/objectUtils';

const moduleLoader = function(options = {}) {

    const defaults = {
        moduleDataAttr: 'data-module'
    };
    const mutationConfig = {
        childList: true,
        attributes: false,
        characterData: false
    };
    const settings = Object.assign({}, defaults, options);

    function init() {
        const observer = new MutationObserver(onMutation);
        observer.observe(document.body, mutationConfig);
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