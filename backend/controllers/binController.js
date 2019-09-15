var mongoose = require('mongoose');
var Trash = require('Trash')
var User = require('User')
exports.getBinStatus = function(req, res) {	
    let userQuery = {
        firebase_uid : req.query.user
    }
    //fetch user object id
    User.findOne(userQuer)
        .then(user => {
            if(user == null) {
                return null
            } else {
                return user._id
            }
        }) 
        .then()
    
}
