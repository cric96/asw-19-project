
export default {
    formatAddressInfo: function(building, includeCityInfo=false) {
        if(!building) return ''
        return `${building.address} ${includeCityInfo ? this.formatCityInfo(building.city) : ''}`
    },
    formatCityInfo: function(city) {
        if(!city) return ''
        return `${city.name}, ${city.cap}, ${city.state}`
    },
    formatUserDisplayName: function(user) {
        if(!user) return ''
        let nameSurname = (user.name && user.surname) ? `${user.name} ${user.surname}` : undefined
        return user.nickname || nameSurname || user.email
    },
    initial: function(value) {
        if(!value) return ''
        return value.charAt(0).toUpperCase()
    }
}