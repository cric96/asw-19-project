var mongoose = require('mongoose');
var admin = require('firebase-admin');
var User = mongoose.model('User');

module.exports = function(req, res, next) {
    if(req.headers.authorization) {
        let idToken = req.headers.authorization;
        admin.auth().verifyIdToken(idToken, true)
        .then(function(decodedToken) {
            res.locals.uid = decodedToken.uid;
            fetchLoggedUser(decodedToken.uid).then((user)=>{
                res.locals.userAuth = user;
                next();
            }).catch((err)=>{
                //fetch user failed; user not logged and not existing in db
            });
        })
        .catch(function(error) {
            res.status(401).json({
                description: 'Not authorized, not valid token.'
            })
        });
    } else {
        res.status(400).json({
            description: 'Bad request.'
        })
    }
};

function fetchLoggedUser(firebase_id){
    return new Promise((resolve, reject)=>{
        User.findOne({firebase_uid: firebase_id}, function(err, user) {
            if(user && !err) {
                resolve(user); 
                console.log("BB")
            } else {
                reject(err)
            }
        });
    });
    
}