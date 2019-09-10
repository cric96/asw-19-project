var mongoose = require('mongoose');

var City = require('../models/cityModel');

let mongooseConfig = require('../mongoose-config.json')
mongoose.connect(`mongodb+srv://${mongooseConfig.username}:${mongooseConfig.password}@scanbage-fd95g.mongodb.net/v1?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: false });
var args = process.argv.slice(2) //first two value are used to describe the path of program and the argument to launch program

if (args.length < 4) {
    console.log("you must pass [city name] [cap] [state] [bin categories ids]*")
}

new City({
        name: args[0],
        cap: args[1],
        state: args[2],
        binCategories: args.slice(3)
    })
    .save()
    .then(value => console.log("City created"))
    .finally(() => mongoose.disconnect())