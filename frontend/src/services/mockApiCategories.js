import {simulateDelay} from './mockApiHelper'

export default {
    getCategories : function(){
        return simulateDelay(() => 
        { return [
            {
                name: 'Plastica',
                score: "8", 
                url: "https://image.flaticon.com/icons/svg/1039/1039778.svg"
            },
            {
                name: 'Carta',
                score: "5", 
                url: "https://image.flaticon.com/icons/svg/1039/1039778.svg"
            },
            {
                name: 'Alluminio',
                score: "2", 
                url: "https://image.flaticon.com/icons/svg/1039/1039778.svg"
            },
            {
                name: 'Vetro',
                score: "6", 
                url: "https://image.flaticon.com/icons/svg/1039/1039778.svg"
            },
            {
                name: 'Indifferenziato',
                score: "0", 
                url: "https://image.flaticon.com/icons/svg/1039/1039778.svg"
            }
        ]}, 500);
    }  
}
