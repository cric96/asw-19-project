/**
 * verify if the firebase_uid match with the user
 * authenticated
 */
module.exports = function(req, res, next) {
    if(res.locals.uid != req.params.userId) {
        res.setForbidden("The id must match with the logged user")
    } else {
        next()
    }
}