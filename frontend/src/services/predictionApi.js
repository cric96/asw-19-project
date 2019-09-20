import axios from 'axios'

function post(image, finalUrl) {
    return axios.post("http://localhost:7000/v0/prediction"+finalUrl, image, {
            headers: { 'Content-type' : 'image/jpg' }
        })
} 
export default {
    aiPredict: function(image){
        return post(image, "/ai")
    },
    barcodePredict: function(image){
        return post(image, "/barcode")
    }
}
