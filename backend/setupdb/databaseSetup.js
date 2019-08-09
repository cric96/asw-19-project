var mongoose = require("mongoose")
var TrashCategory = require("../models/trashCategoryModel");
var Reward = require("../models/rewardModel");

mongoose.connect('mongodb://localhost/dbtrash', { useNewUrlParser: true, useFindAndModify: false });


var trashCategories = require("./trashCategories.json");
trashCategories.forEach(element => {
    let trashCategory = new TrashCategory(element)
    trashCategory.save((err, trash) => {
        if(err) {
            console.log("Error during save: " + element.name);
        } else {
            console.log("Saved: " + trash);
        }
    });
});

var rewards = require("./rewards.json");
rewards.forEach(element => {
    let reward = new Reward(element)
    reward.save((err, trash) => {
        if(err) {
            console.log("Error during save: " + err);
        } else {
            console.log("Saved: " + trash);
        }
    });
});