/**
 * Created by Andres Monroy (HyveMynd) on 12/3/14.
 */

var AccountRoutes = function(express){
    var router = express.Router();
    var passport = require('passport');
    var Membership = require('user-module');

    router.post('/login', function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err){ return next(err); }
            if (!user){ return res.status(401).send(info); }
            req.login(user, function (err) {
                if (err){
                    return next(err);
                }
                return res.send(user);
            })
        })(req, res, next);
    });

    router.post('/register', function (req, res, next) {
        var membership = new Membership('membership');
        var user = req.body;
        membership.register(user.email, user.password, user.confirm, user.firstName, user.lastName, function (err, regResult) {
            if (err){
                return next(err);
            }
            if (!regResult.success){
                return res.status(401).send(regResult);
            }
            req.login(regResult.user, function (err) {
                if (err){
                    return next(err);
                }
                return res.send(regResult.user);
            })
        })
    });

    router.post('/logout', function (req, res, next) {
        req.logout();
        res.redirect('/'); //todo change to redirect you want
    });

    return router;
};

module.exports = AccountRoutes;