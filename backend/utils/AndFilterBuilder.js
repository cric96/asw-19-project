/**
 * this class is used to create a filter builder 
 * that put each filter in and with the other
 */
module.exports = class AndFilterBuilder {
    constructor() {
        this.filters = []
    }
    pushFilter(filter) {
        this.filters.push(filter)
        return this
    }
    /**
     * create the query with each filter in and
     */
    build() {
        return {
            $and : this.filters
        }
    }
}
