import {simulateDelay} from './mockApiHelper'

export default {
    getCategories : function(){
        return simulateDelay(() => 
        { return [
            {
                name: 'Plastica',
                score: "8", 
                url: "https://www.stile.it/wp-content/uploads/2018/02/iStock-629554844-1024x576.jpg"
            },
            {
                name: 'Carta',
                score: "5", 
                url: "https://www.falcorpresse.it/wp-content/uploads/rifiuto-carta-giornali.jpg"
            },
            {
                name: 'Alluminio',
                score: "2", 
                url: "http://assets.gestione-rifiuti.it/immagini/alluminio/lattine_alluminio.jpg"
            },
            {
                name: 'Vetro',
                score: "6", 
                url: "http://www.ciaccimagazine.org/wp-content/uploads/2012/09/riciclo-vetro-1238.jpg"
            },
            {
                name: 'Indifferenziato',
                score: "0", 
                url: "http://1.citynews-foggiatoday.stgy.ovh/~media/original-hi/4562599333645/discarica-2.jpg"
            }
        ]}, 500);
    }  
}
