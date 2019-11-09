
module.exports = function(req, res, next) {
    res.locals.folder = "reward"
    res.locals.imageId = req.params.rewardName
    res.locals.ext = "png"
    next()
} 