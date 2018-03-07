const moduleLoader = function(options = {}) {

    const defaults = {
        moduleDataAttr: 'data-module',
        elToObserve: document.body,
        enableObservation: true
    };
    const mutationConfig = {
        attributes: false,
        characterData: false,
        childList: true
    };
    const settings = {...defaults, ...options};

    function init() {
        const elsWithModules = [...document.querySelectorAll(`[${settings.moduleDataAttr}]`)];
        loadModules(elsWithModules);
        if (settings.enableObservation === true) {
            initMutationObserver();
        }
    }

    function initMutationObserver() {
        const observer = new MutationObserver(onMutation);
        observer.observe(settings.elToObserve, mutationConfig);
    }

    function onMutation(mutationsList) {
        mutationsList.forEach(mutation => {
            const moduleEls = getModuleEls(mutation);
            loadModules(moduleEls);
        });
    }

    function getModuleEls(mutation) {
        const addedEls = [...mutation.addedNodes];
        return addedEls.filter(el => isElement(el) && el.getAttribute(settings.moduleDataAttr));
    }

    function loadModules(els) {
        els.forEach(el => {
            const module = el.getAttribute(settings.moduleDataAttr);
            const props = {
                containerElement: el
            };
            System.import(module).then(mod => mod.default(props));
        });
    }

    function isElement(item) {
        return item instanceof Element;
    }

    init();

};

export default moduleLoader;