var createError = require('http-errors');
var express = require('express');
require("./decoreExpress").decore(express);
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var admin = require('firebase-admin');
    
var app = express();

let serviceAccount = require('./scanbage-firebase-adminsdk-itzje-52ab1c019c.json')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
//mongo connection

require("./mongo").setupCloud()
//express config
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
//link frontend with the backend, that the site generated with npm run build
app.use(express.static(path.join(__dirname, '../frontend/dist')))

//link routes to app
require("./routes").setup(app)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

module.exports = app;