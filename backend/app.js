var createError = require('http-errors');
var express = require('express');
var path = require('path');
var mongoose = require('mongoose')
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var moviesModel = require("./models/moviesModel");
var moviesRouter = require('./routes/moviesRoutes');

var app = express();

mongoose.connect('mongodb://localhost/dbmovies', { useNewUrlParser: true, useFindAndModify: false });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/dist')))
app.use('/api', moviesRouter);

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
  res.render('error');
});

module.exports = app;
