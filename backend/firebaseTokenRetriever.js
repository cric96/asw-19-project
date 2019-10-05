module.exports = function() {
    if(process.env.FIREBASE_TOKEN !== undefined) {
        return JSON.parse(process.env.FIREBASE_TOKEN)
    } else {
        return require('./scanbage-firebase-adminsdk-itzje-52ab1c019c.json')
    }
}