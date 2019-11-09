module.exports = function(req, res, next) {
    res.locals.imageId = req.params.userId
    res.locals.folder = "user"
    next()
} 