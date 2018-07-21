var passport = new require("passport");

exports.sign_up = function (req, res, next) {
    res.render('user/sign_up', {title: 'Sign Up', csrfToken: req.csrfToken()});
};

exports.create = passport.authenticate('local.signup', {
    successRedirect: 'profile',
    failureRedirect: 'sign_up',
    failureFlash: true
});

exports.profile = function (req, res, next) {
    // redirect to the directory of the file profile.js
    res.render('user/profile', { title: 'Profile'})
};

exports.sign_in = function (req, res, next) {
    res.render('user/sign_in', {title: 'Sign In', csrfToken: req.csrfToken()});
};

exports.login = passport.authenticate('local.signin', {
    successRedirect: 'profile',
    failureRedirect: 'sign_in',
    failureFlash: true
});

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

exports.logoutNext = function(req, res, next) {
    next();
};