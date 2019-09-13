
export default {
    formatUserDisplayName: function(user) {
        if(!user) return ''
        let nameSurname = (user.name && user.surname) ? `${user.name} ${user.surname}` : undefined
        return user.nickname || nameSurname || user.email
    },
    initial: function(value) {
        if(!value) return ''
        return value.charAt(0)
    }
}