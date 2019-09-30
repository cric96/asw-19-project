import axios from 'axios'

function post(image, finalUrl) {
    return axios.post(process.env.VUE_APP_PREDITION_SERVER + finalUrl, image, {
            headers: { 'Content-type' : 'image/jpg' }
        })
} 
export default {
    aiPredict: function(image){
        return post(image, "/ai")
    },
    barcodePredict: function(image){
        return post(image, "/barcode")
    },
    OK_STATUS : 0
}
