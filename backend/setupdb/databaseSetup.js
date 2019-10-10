//populate mongodb with trash category and the rewards
var mongoose = require("mongoose")
var TrashCategory = require("../models/trashCategoryModel");
var Reward = require("../models/rewardModel");

let mongooseConfig = require('../mongoose-config.json')
mongoose.connect(`mongodb+srv://${mongooseConfig.username}:${mongooseConfig.password}@scanbage-fd95g.mongodb.net/v1?retryWrites=true&w=majority`, { useNewUrlParser: true, useFindAndModify: false });
//save all trash categories 
var trashCategories = require("./trashCategories.json");
trashCategories.forEach(element => {
    let trashCategory = new TrashCategory(element)
    trashCategory.save((err, trash) => {
        if (err) {
            console.log("Error during save: " + element.name);
        } else {
            console.log("Saved: " + trash);
        }
    });
});
//save all rewards
var rewards = require("./rewards.json");
rewards.forEach(element => {
    let reward = new Reward(element)
    reward.save((err, trash) => {
        if (err) {
            console.log("Error during save: " + err);
        } else {
            console.log("Saved: " + trash);
        }
    });
});