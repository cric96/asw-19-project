import axios from 'axios'
import store from '../store/store'
import querystring from 'querystring'
import { tokenProvider } from './firebaseAuthService'

class ApiService {
    
    constructor(baseURL = ""){
        this.axios = axios.create({
            baseURL: baseURL
        })
    }

    get(resource, queryParams = null, requireAuth = false) {
        return makeRequest(this.axios.get, resource, queryParams, requireAuth)
    }

    post(resource, data, queryParams = null, requireAuth= false) {
        return makeRequest(this.axios.post, resource, queryParams, requireAuth, data)
    }

    put(resource, data, queryParams = null, requireAuth= false) {
        return makeRequest(this.axios.put, resource, queryParams, requireAuth, data)
    }

    delete(resource, requireAuth = false) {
        return makeRequest(this.axios.delete, resource, null, requireAuth)
    }
}

export default ApiService
// TODO: change the base url, retrieving it from .env
export const apiService = new ApiService(process.env.VUE_APP_NODE_SERVER)

function makeRequest(axiosFunction, resource, queryParams = null, authorization = false, body = undefined) {
    let headers = authorization ? getHeader() : { }
    if(queryParams !== null) {
        resource += `?${querystring.stringify(queryParams)}`
    }
    let request = (body != undefined) ? axiosFunction(resource, body, headers) : axiosFunction(resource, headers)
    return request.then(response => Promise.resolve(response.data)).catch(err => { throw err.response })
}

function getHeader() {
    let token = tokenProvider.currentToken
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }
}
