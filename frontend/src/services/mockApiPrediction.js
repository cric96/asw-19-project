import {simulateDelay} from './mockApiHelper'
class MockApiPrediction {
    constructor(){}

    predict(image) {
        return simulateDelay(() => 
        { return {
            name: 'Plastica',
            score: "8", 
            url: "https://image.flaticon.com/icons/svg/1039/1039778.svg"}}, 2000);
    }
}

export const Prediction = new MockApiPrediction()
