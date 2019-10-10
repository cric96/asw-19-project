var createError = require('http-errors');
var express = require('express');
require("./decoreExpress").decore(express);
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var admin = require('firebase-admin');
<<<<<<< HEAD

var userModel = require("./models/userModel");
var usersRouter = require('./routes/usersRoutes');
=======
>>>>>>> socket
var app = express();
var fallback = require('connect-history-api-fallback');

<<<<<<< HEAD

let serviceAccount = require('./scanbage-firebase-adminsdk-itzje-52ab1c019c.json')
=======
let tokenRetriver = require('./firebaseTokenRetriever')
>>>>>>> socket
admin.initializeApp({
    credential: admin.credential.cert(tokenRetriver())
});
<<<<<<< HEAD

const uri = "mongodb+srv://admin:codingASW2019@scanbage-fd95g.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useFindAndModify: false });
=======
//mongo connection
require("./mongo").setupCloud()
//express config
>>>>>>> socket
app.use(logger('dev'));
// allow to use the router of client, this prevent express to send 404 for unknown path
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
//link routes to app
require("./routes").setup(app)
//vue history: is used to using vue routers
app.use(fallback());
//link frontend with the backend, that the site generated with npm run build
app.use(express.static(path.join(__dirname, '../frontend/dist')))

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