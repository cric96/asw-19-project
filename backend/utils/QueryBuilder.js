module.exports = class QueryBuilder {
    constructor() {
        this.filters = []
    }

    pushFilter(filter) {
        this.filters.push(filter)
        return this
    }

    build() {
        return {
            $and : this.filters
        }
    }
}