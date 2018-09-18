import moduleLoader from './moduleLoader.js';
import mutationObserver from './__mocks__/mutationObserver.js';

beforeAll(() => {
    global.MutationObserver = mutationObserver;
});

describe('moduleLoader loads a file', () => {
    let componentEl;
    
    beforeEach(() => {
        document.body.innerHTML = `<div data-module="componentA"></div>`;

        componentEl = document.querySelector('[data-module]');
    });

    it('using ES module import', async () => {   
        moduleLoader({
            loadingMethod: 'esm',
            basePath: ''
        });

        const expectedProps = {
            containerElement: componentEl
        };

        const mod = await import('componentA-bundle.js');
        expect(mod.default).toHaveBeenCalledTimes(1);
        expect(mod.default).toHaveBeenCalledWith(expectedProps);
    });

    it('using System import', async () => {
        const mod = await import('componentA-bundle.js');

        global.System = {
            import: jest.fn().mockReturnValue(Promise.resolve(mod))
        };

        moduleLoader({
            loadingMethod: 'system',
            basePath: ''
        });

        const expectedProps = {
            containerElement: componentEl
        };
        
        expect(mod.default).toHaveBeenCalledTimes(1);
        expect(mod.default).toHaveBeenCalledWith(expectedProps);
    });

    it('after a DOM mutation', async () => {
        moduleLoader({
            loadingMethod: 'esm',
            basePath: ''
        });

        document.body.innerHTML += `<div data-module="componentB"></div>`;

        const expectedProps = {
            containerElement: document.querySelector('[data-module="componentB"]')
        };

        mutationObserver.__mutate(expectedProps.containerElement);

        const mod = await import('componentB-bundle.js');
        expect(mod.default).toHaveBeenCalledTimes(1);
        expect(mod.default).toHaveBeenCalledWith(expectedProps);
    });
});