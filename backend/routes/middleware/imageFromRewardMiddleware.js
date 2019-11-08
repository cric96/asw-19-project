
module.exports = function(req, res, next) {
    console.log("here")
    res.locals.imageId = "reward/" + req.params.rewardName
    res.locals.ext = "png"
    next()
} 