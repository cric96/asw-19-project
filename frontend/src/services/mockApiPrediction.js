import helper from './mockApiHelper'
class MockApiPrediction {
    constructor(){}

    predict(image) {
        return helper.simulateDelay(() => 'Plastic', 2000);
    }
}

export const Prediction = new MockApiPrediction()
