let moduleLoader = {

    init: function() {
        var elsWithModules = Array.prototype.slice.call(document.querySelectorAll('[data-module]'));
        elsWithModules.forEach(this.loadModule);
    },

    loadModule: function(el) {
        let module = el.getAttribute('data-module'),
            props = {
                'containerElement': el
            };
        System.import(module).then(function(mod) {
            mod.default(props);
        });
    }

};

export default moduleLoader;