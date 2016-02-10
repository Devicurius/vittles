var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');

var routes = require('./routes/index');
var users = require('./routes/users');
var recipes = require('./routes/recipes');

var app = express();

// // Connect to database
// mongoose.connect('mongodb://localhost/recipes');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'We love food.'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport/passport')(passport);

//Set current user for views
app.use(function (req, res, next) {
  global.currentUser = req.user;
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/recipes', recipes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Connect to database
if (app.get('env') === 'development') {
  mongoose.connect('mongodb://localhost/recipes');
}
else {
  mongoose.connect(process.env.MONGOLAB_URI);
}
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});

console.log('Running in %s mode', app.get('env'));

module.exports = app;
