var mongoose = require('mongoose');
var utils = require("../utils/utils");
var User = mongoose.model('User');


exports.list_rewards = function(req, res) {
    let uid = res.locals.uid
    User.findOne({firebase_uid: uid})
        .populate('rewards')
        .exec((err, user) => {
            if(!err) {
                utils.sendResponseMessage(res, 200, user.rewards); 
            } else {
                utils.sendResponseMessage(res, 500, "Internal Error"); 
            }
        })
};