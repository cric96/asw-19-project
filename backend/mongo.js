var mongoose = require('mongoose')
//NB! mongoose need all schema to connect into the database, they are used to initialized the schemas
var userModel = require("./models/userModel");
var buildingModel = require('./models/buildingModel');
var cityModel = require("./models/cityModel")
var trashModel = require("./models/trashModel")
var trashCategoryModel = require("./models/trashCategoryModel")
var binCategoryModel = require("./models/binModel")
var cityModel = require("./models/cityModel")
var rewardModel = require("./models/rewardModel")

module.exports.setupLocal = function() {
    //TODO
}

module.exports.setupCloud = function() {
    let mongooseConfig = undefined
    if(process.env.MONGOOSE_TOKEN !== undefined) {
        mongooseConfig = JSON.parse(process.env.MONGOOSE_TOKEN)
    } else {
        mongooseConfig = require('./mongoose-config.json')
    }
    mongoose.connect(`mongodb+srv://${mongooseConfig.username}:${mongooseConfig.password}@scanbage-fd95g.mongodb.net/v2?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: false });
}