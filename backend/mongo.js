var mongoose = require('mongoose')
//NB! mongoose need all schema to conect into the data
var userModel = require("./models/userModel");
var buildingModel = require('./models/buildingModel');
var cityModel = require("./models/cityModel")
var trashModel = require("./models/trashModel")
var trashCategoryModel = require("./models/trashCategoryModel")
var binCategoryModel = require("./models/binModel")
var cityModel = require("./models/cityModel")

module.exports.setupLocal = function() {

}

module.exports.setupCloud = function() {
    let mongooseConfig = undefined
    if(process.env.MONGOOSE_TOKEN !== undefined) {
        mongooseConfig = JSON.parse(process.env.MONGOOSE_TOKEN)
    } else {
        mongooseConfig = require('./mongoose-config.json')
    }
    mongoose.connect(`mongodb+srv://${mongooseConfig.username}:${mongooseConfig.password}@scanbage-fd95g.mongodb.net/v1?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: false });
}