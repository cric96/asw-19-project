module.exports = function(req, res, next) {
    console.log("HERE")
    res.locals.imageId = req.params.userId
    console.log(res.locals.imageId)
    res.locals.ext = "jpg"
    next()
} 