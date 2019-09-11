var mongoose = require('mongoose')
//NB! mongoose need all schema to conect into the data
var userModel = require("./models/userModel");
var buildingModel = require('./models/buildingModel');

module.exports.setupLocal = function() {

}

module.exports.setupCloud = function() {
    let mongooseConfig = require('./mongoose-config.json')
    mongoose.connect(`mongodb+srv://${mongooseConfig.username}:${mongooseConfig.password}@scanbage-fd95g.mongodb.net/v1?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: false });
}