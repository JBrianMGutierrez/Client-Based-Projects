var passport = new require('passport');
var User = new require('../models/user_model');
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    var findOrCreateUser = function () {
        //find the user if exist
        User.findOne({'username': username}, function (err, user) {
            if (err) {
                return done(err);
            }
            //already exist
            if (user) {
                //req.flash('message', 'your message')
                return done(null, false, {message: 'Email has already taken'});
            } else {
                var newUser = new User();
                newUser.password = newUser.encryptPassword(password);
                newUser.email = req.body.email;
                newUser.username = username;
                newUser.first_name = req.body.first_name;
                newUser.last_name = req.body.last_name;
                newUser.save(function (err) {
                    if (err) {
                        return done(err);
                    } else {
                        return done(null, newUser);
                    }
                });
            }
        });
    };
    process.nextTick(findOrCreateUser);
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function (req, username, password, done) {
    User.findOne({'username': username}, function (err, user) {
        if (err) {
            return done(err);
        }
        //already exist
        if (!user) {
            //req.flash('message', 'your message')
            return done(null, false, {message: 'No User Found!'});
        }
        if (!user.validPassword(password)){
            return done(null, false, {message: 'Password Error!'});
        } else {
            return done(null, user);
        }
    });
    }
));