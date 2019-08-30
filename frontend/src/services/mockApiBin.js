import {simulateDelay} from './mockApiHelper'
import Bin from '../model/bin'

class MockApiBin {
    constructor(){}

    getAll(building) {
        return simulateDelay(() => {
            return [
                new Bin(300, ['Paper'], '#d50000'),
                new Bin(350, ['Plastic'], '#fdd835'),
                new Bin(20, ['Glass'], '#43a047')
            ]
        }, 5000);
    }
}

export const ApiBin = new MockApiBin()
