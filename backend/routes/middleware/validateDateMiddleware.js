function areDatesValid(from, to) {
    return (from === undefined || isFinite(from)) && (to === undefined || isFinite(to))
}
function parseDateOrElse(timestap, orElseDate) {
    return (timestap === undefined || timestap == '') ? orElseDate : new Date(parseInt(timestap))
} 

module.exports = function(req, res, next) {
    if(!areDatesValid(req.query.to, req.query.from)) {
        res.setBadRequest("Put timestamp in date field")
        return
    }
    let to = parseDateOrElse(req.query.to, new Date())
    let from = parseDateOrElse(req.query.from, new Date(1))
    res.locals.filterBuilder.pushFilter({
        date: {
            $lt : to,
            $gt : from
        }
    })
    next()
} 