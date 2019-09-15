//TODO PUT VERSION IN PATH
module.exports.setup = function(app, version = "v0") {
    var usersRoutes = require('./routes/usersRoutes')
    var buildingRoutes = require('./routes/buildingsRoutes')
    var membersRoutes = require('./routes/membersRoutes')
    app.use('/api', usersRoutes)
    app.use('/api', buildingRoutes)
    app.use('/api', membersRoutes)
}