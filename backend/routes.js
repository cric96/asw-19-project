module.exports.setup = function(app, version = "v0") {
    var usersRoutes = require('./routes/usersRoutes');
    var buildingRoutes = require('./routes/buildingsRoutes');
    app.use('/api', usersRoutes);
    app.use('/api', buildingRoutes);
}