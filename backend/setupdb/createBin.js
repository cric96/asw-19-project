var mongoose = require('mongoose');

var TrashCategory = require('../models/trashCategoryModel');
var Bin = require("../models/binModel")

let mongooseConfig = require('../mongoose-config.json')
mongoose.connect(`mongodb+srv://${mongooseConfig.username}:${mongooseConfig.password}@scanbage-fd95g.mongodb.net/v1?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: false });
var args = process.argv.slice(2) //first two value are used to describe the path of program and the argument to launch program

if (args.length < 3) {
    console.log("you must pass [bin name] [colour] [trash category]*")
}
//fetch all trash category from database
Promise.all(args.slice(2).map(trashName => {
        console.log(trashName)
        return TrashCategory.findOne({ name: trashName })
            .exec()
    }))
    //save bin with name, colour and trash categories passed
    .then(trashCategories => {
        new Bin({
                name: args[0],
                colour: args[1],
                trashCategories: trashCategories.map(trashCategory => trashCategory._id)
            }).save()
            .then(value => console.log("Bin created"))
            .finally(() => mongoose.disconnect())
    })
    .catch(err => {
        console.log(err)
        mongoose.disconnect()
    })