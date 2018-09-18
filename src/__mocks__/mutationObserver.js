let instance = null;
    
function createMutationList(el) {
    return [
        {
            addedNodes: [el]
        }
    ]
}

const mutationObserver = jest.fn().mockImplementation(listener => {
    instance = {
        observe: jest.fn(),
        __listener: listener
    };
    return instance;
});

mutationObserver.__mutate = el => instance.__listener(createMutationList(el));

export default mutationObserver;