import filters from './filters'

export default {
    install(Vue) {
        for(const key of Object.keys(filters)) {
            Vue.filter(key, filters[key])
        }
    }
}

