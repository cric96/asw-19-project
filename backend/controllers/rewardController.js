var mongoose = require('mongoose');
var utils = require("../utils/utils");
var Reward = mongoose.model('Reward');
var cache = require("../models/cache")

exports.listRewards = function(req, res) {
    res.setOk(cache.rewards.elements)
};