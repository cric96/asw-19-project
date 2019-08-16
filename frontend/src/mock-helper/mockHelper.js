
export default class MockHelper {
    constructor(resources) {
        this.resources = resources;
    }

    query(filterFunction) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let result = this.resources.filter(filterFunction);
                resolve(result);
            }, 1500);
        });
    }

    insert(resource) {
        this.resources += resource;
    }

    delete(resource) {
        this.resources -= resource;
    }
}