var passport = new require("passport");
var Order = new require('../models/order_model');
var Cart = require('../models/cart_model');

exports.sign_up = function (req, res, next) {
    res.render('user/sign_up', {title: 'Sign Up', csrfToken: req.csrfToken()});
};

exports.create = passport.authenticate('local.signup', {
    failureRedirect: 'user/sign_up',
    failureFlash: true
});

exports.profile = function (req, res, next) {
    var userCart;
    Order.find({user: req.user}, function (err, orders) {
        if(err) {
            throw err;
        } else {
            orders.forEach(function (order) {
                userCart = new Cart(order.cart);
                order.items = userCart.generateItemsInArray();
            });
            res.render('user/profile', { title: 'Profile', orders: orders});
        }
    });
};

exports.sign_in = function (req, res, next) {
    res.render('user/sign_in', {title: 'Sign In', csrfToken: req.csrfToken()});
};

exports.login = passport.authenticate('local.signin', {
    failureRedirect: 'user/sign_in',
    failureFlash: true
});

exports.checkoutLoggedIn = function (req, res, next) {
    if(req.session.oldURL){
        var oldURL = req.session.oldURL;
        req.session.oldURL = null;
        res.redirect(oldURL);
    } else {
        res.redirect('user/profile');
    }
};

exports.isUserLogin = function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
};

exports.sign_out = function (req, res, next) {
    req.logout();
    res.redirect('/');
};

exports.userNotLogin = function (req, res, next) {
    if(!req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
};

exports.CheckoutLogin = function (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    } else {
        req.session.oldURL = req.url;
        res.redirect('user/sign_in');
    }
};

exports.logoutNext = function(req, res, next) {
    next();
};