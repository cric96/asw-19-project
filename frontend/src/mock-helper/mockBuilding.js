import MockHelper from './mockHelper.js'

class MockBuilding extends MockHelper {
    constructor(resources) {
        super(resources)
    }

    getAll() {
        return super.query((entry) => true)
    }

    getById(id) {
        return super.query((entry) => entry.id == id)
    }
}

export const BuildingMock = new MockBuilding([
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
    ]);