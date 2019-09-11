const NAME_INDEX = 0
const CAP_INDEX = 1
const STATE_INDEX = 2
const BIN_START_INDEX = 3
const ARGS_START_INDEX = 2
var mongoose = require('mongoose');

var City = require('../models/cityModel');

let mongooseConfig = require('../mongoose-config.json')
mongoose.connect(`mongodb+srv://${mongooseConfig.username}:${mongooseConfig.password}@scanbage-fd95g.mongodb.net/v1?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: false });
/*
first two value are used to describe
 the program's path and the program name (node)
*/
var args = process.argv.slice(ARGS_START_INDEX) //return an array without the first two elements 
if (args.length <= BIN_START_INDEX) { //some informations are missing
    console.log("you must pass [city name] [cap] [state] [bin categories ids]*")
}
//create new city
new City({
        name: args[NAME_INDEX],
        cap: args[CAP_INDEX],
        state: args[STATE_INDEX],
        binCategories: args.slice(BIN_START_INDEX) //take all id passed through console
    })
    .save() //save the new city in mongodb
    .then(value => console.log("City created")) //all ok
    .finally(() => mongoose.disconnect()) //disconect from database