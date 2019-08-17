/**
 * @author [Andrea Petreti]
 * @create date 2019-08-17 14:44:59
 */

import MockApiHelper from './mockApiHelper'

class MockApiBuilding {
    constructor(mockApiHelper) {
        this.apiHelper = mockApiHelper
    }

    getAll() {
        return this.apiHelper.query(() => true)
    }

    getById(id) {
        return this.apiHelper.query((entry) => entry.id == id)
    }
}

export const ApiBuilding = new MockApiBuilding(new MockApiHelper([
        {
            id: 1,
            name: 'Montefelcino House',
            address: 'Via via via',
        },
        {
            id: 2, 
            name: "Mone ufficio",
            address: 'Via Mone'
        },
        {
            id: 3,
            name: "Gianlu's home",
            address: 'San michele'
        }
    ]));