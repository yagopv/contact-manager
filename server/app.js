/**
 * App Module
 * @type {*|exports|module.exports}
 */
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const swig = require('swig');

var app = express();

/**
 * View engine setup
 */
app.engine('html', swig.renderFile);
app.set('views', path.join(process.cwd(), 'server/views'));
app.set('view engine', 'html');

/* Config swig */
//Avoid collisions with angular interpolation
swig.setDefaults({ varControls: ['[[', ']]'] });

/**
 * Middleware setup
 */
app.use(favicon(path.join(process.cwd(), 'client', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(process.cwd(), 'client')));
app.use(cors());
app.use(logger('dev'));

/**
 * Define routes
 */
require('./config/router')(app);

/**
 * Start mongoose connection
 */
require("./db/mongoose");

/**
 * Catch 404 and forward to error handler
 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/**
 * Development error handler
 * Will print stacktrace
 */
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

/**
 * Production error handler
 * (No stacktraces leaked to user)
 */
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
