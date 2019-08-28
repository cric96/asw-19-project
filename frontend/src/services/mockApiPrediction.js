import {simulateDelay} from './mockApiHelper'
class MockApiPrediction {
    constructor(){}

    predict(image) {
        return simulateDelay(() => 'Plastic', 2000);
    }
}

export const Prediction = new MockApiPrediction()
