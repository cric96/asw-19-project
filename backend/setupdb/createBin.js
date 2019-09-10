
const NAME_INDEX = 0
const COLOUR_INDEX = 1
const START_TRASH_INDEX = 2
const START_ARGS_INDEX = 2
var mongoose = require('mongoose');

var TrashCategory = require('../models/trashCategoryModel');
var Bin = require("../models/binModel")

let mongooseConfig = require('../mongoose-config.json')
mongoose.connect(`mongodb+srv://${mongooseConfig.username}:${mongooseConfig.password}@scanbage-fd95g.mongodb.net/v1?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: false });
/*
    first two value are used to describe
    the program's path and the program name (node)
*/
var args = process.argv.slice(START_ARGS_INDEX) 
if (args.length <= START_TRASH_INDEX) {
    console.log("you must pass [bin name] [colour] [trash category]*")
}
//fetch all trash category from database
Promise.all(args.slice(START_TRASH_INDEX).map(trashName => { //map the trash name with trash id
        return TrashCategory.findOne({ name: trashName }).exec() 
    }))
    //save bin with name, colour and trash categories passed
    .then(trashCategories => {
        new Bin({
                name: args[NAME_INDEX],
                colour: args[COLOUR_INDEX],
                trashCategories: trashCategories.map(trashCategory => trashCategory._id)
            }).save()
            .then(value => console.log("Bin created"))
            .finally(() => mongoose.disconnect())
    })
    .catch(err => {
        console.log(err)
        mongoose.disconnect()
    })