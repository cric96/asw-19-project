import ApiService from './apiService'
import querystring from 'querystring';

const autoCompleteService = new ApiService("http://autocomplete.geocoder.api.here.com/6.2/")

const appId = "rLrlP5wjSkJAq9o1VZxv"
const appCode = "ZBnxk251rDJ-n31YF4dsqQ"
const resultLimit = 10
const countryFilter = "ITA"
const language = "IT"

export default {
    findSuggestions(query) {
        return autoCompleteService.get(
            `suggest.json?app_id=${appId}&app_code=${appCode}&query=${query}&maxresults=${resultLimit}&country=${countryFilter}&language=${language}`
        );
    },
    mapImageURL(country, city, street, houseNumber, width) {
        const queryParams = {
            'app_id': appId,
            'app_code': appCode,
            'co': country,
            'z': 17, // zoom
            'ci': city,
            's': street,
            'n': houseNumber,
            'w': width,
            'nocp': ''
        }
        return `https://image.maps.api.here.com/mia/1.6/mapview?${querystring.stringify(queryParams)}`
    }
}