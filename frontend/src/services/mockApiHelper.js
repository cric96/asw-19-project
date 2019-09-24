/**
 * @author [Andrea Petreti]
 * @create date 2019-08-17 14:44:48
 */


export function simulateDelay(fun, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(fun());
        }, delay);
    });
}

export default class MockApiHelper {
    constructor(resources) {
        this.resources = resources;
    }

    query(filterFunction) {
        return simulateDelay(() => this.resources.filter(filterFunction), 700);
    }

    insert(resource) {
        return simulateDelay(() => { this.resources.push(resource); return resource; }, 700);
    }

    delete(resource) {
        return simulateDelay(() => this.resources -= resource, 700);
    }
}