/**
 * Created by Andres Monroy (HyveMynd) on 12/3/14.
 */

var Membership = require('user-module');
var membership = new Membership('membership');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

var Passport = function(app){
    // Setup passport
    passport.use(new LocalStrategy(function (email, password, done) {
        membership.authenticate(email, password, function (err, authResult) {
            if (authResult.success){
                done(null, authResult.user);
            } else {
                done(null, false, {message: authResult.message});
            }
        })
    }));
    passport.serializeUser(function (user, done) {
        done(null, user.authenticationToken);
    });
    passport.deserializeUser(function (token, done) {
        membership.findByUserToken(token, done);
    });

    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = Passport;