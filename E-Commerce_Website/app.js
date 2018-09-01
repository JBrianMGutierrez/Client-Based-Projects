var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');
var session = require('express-session');
var database = require('./config/database');
var passport = new require('passport');
var flash = require('connect-flash');
var mongoSession = require('connect-mongo')(session);
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var productRouter = require('./routes/product');
var checkoutRouter = require('./routes/checkout');
var orderListRouter = require('./routes/order_list');
var helmet = require('helmet');
var app = express();

require('./config/paypal_id');
require('./config/passport');

// view engine setup
app.engine('.hbs', handlebars({defaultLayout: 'layout', extname: '.hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(helmet());
app.use(session({
    secret: 'e-commerce',
    resave: false,
    saveUninitialized: false,
    store: new mongoSession({ mongooseConnection: database.dataMongoose.connection }),
    cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// global variables
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/products', productRouter);
app.use('/checkout', checkoutRouter);
app.use('/order', orderListRouter);

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
