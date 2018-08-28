const moduleLoader = function(options = {}) {

    const defaults = {
        moduleDataAttr: 'data-module',
        elToObserve: document.body,
        enableObservation: true,
        loadingMethod: 'auto',
        basePath: '/js/',
        filenameSuffix: '-bundle.js'
    };
    const mutationConfig = {
        attributes: false,
        characterData: false,
        childList: true
    };
    const settings = {...defaults, ...options};
    const dynamicImportsSupported = supportsDynamicImports();

    function init() {
        const elsWithModules = [...document.querySelectorAll(`[${settings.moduleDataAttr}]`)];
        loadModules(elsWithModules);
        if (settings.enableObservation === true) {
            initMutationObserver();
        }
    }

    function initMutationObserver() {
        if (window.MutationObserver) {
            const observer = new MutationObserver(onMutation);
            observer.observe(settings.elToObserve, mutationConfig);
        }
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
        const loadEsm = settings.loadingMethod === 'esm' || (settings.loadingMethod === 'auto' && dynamicImportsSupported === true);
        els.forEach(el => {
            const module = el.getAttribute(settings.moduleDataAttr);
            const resolvedBasepath = el.dataset.basepath || settings.basePath;
            const resolvedSuffix = el.dataset.suffix || settings.filenameSuffix;
            const modulePath = `${resolvedBasepath}${module}${resolvedSuffix}`
            const props = {
                containerElement: el
            };
            if (loadEsm) {
                import(modulePath).then(mod => mod.default(props));
            } else {
                System.import(modulePath).then(mod => mod.default(props));
            }
        });
    }

    function isElement(item) {
        return item instanceof Element;
    }

    function supportsDynamicImports() {
        try {
            new Function('import("")');
            return true;
        } catch (err) {
            return false;
        }
    }

    init();

};

export default moduleLoader;