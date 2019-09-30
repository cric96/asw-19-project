//TODO PUT VERSION IN PATH
module.exports.setup = function(app, version = "v0") {
    var userRoutes = require('./routes/userRoutes')
    var buildingRoutes = require('./routes/buildingRoutes')
    var memberRoutes = require('./routes/memberRoutes')
    var binRoutes = require('./routes/binRoutes')
    var cityRoutes = require('./routes/cityRoutes')
    var trashRoutes = require('./routes/trashRoutes')
    var trashCategoryRoutes = require('./routes/trashCategoryRoutes')
    var rankRoutes = require('./routes/rankRoutes')
    app.use('/api', userRoutes)
    app.use('/api', buildingRoutes)
    app.use('/api', memberRoutes)
    app.use('/api', binRoutes)
    app.use('/api', cityRoutes)
    app.use('/api', trashRoutes)
    app.use('/api', trashCategoryRoutes)
    app.use('/api', rankRoutes)
}