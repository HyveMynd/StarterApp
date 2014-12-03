/**
 * Created by Andres Monroy (HyveMynd) on 12/3/14.
 */

var IndexRoutes = function(express){
    var router = express.Router();

    /* GET home page. */
    router.get('/partials/:name', function (req, res) {
        res.render('partials/' + req.params.name);
    });

    /* Catch All. Will Re-render the home page for angular */
    router.get('*', function(req, res) {
        res.render('index', { title: 'App' });
    });

    return router;
};

module.exports = IndexRoutes;