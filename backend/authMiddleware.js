var admin = require('firebase-admin');

module.exports = function(req, res, next) {
    if(req.headers.authorization) {
        let idToken = req.headers.authorization;
        admin.auth().verifyIdToken(idToken, true)
        .then(function(decodedToken) {
            res.locals.uid = decodedToken.uid;
            next();
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