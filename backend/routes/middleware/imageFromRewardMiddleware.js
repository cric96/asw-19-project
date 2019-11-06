
module.exports = function(req, res, next) {
    console.log("Here")
    res.locals.imageId = req.params.rewardName
    res.locals.ext = "png"
    console.log(res.locals.ext)
    next()
} 