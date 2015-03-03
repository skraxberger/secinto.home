var bunyan = require('bunyan');

var logger = bunyan.createLogger({name: 'routing'});

/*
 * GET home page.
 */

/**
 * Routing module which is exported an can be used by the express middleware.
 * The app parama is the express middleware which is used to obtain and control the routing.
 *
 * @param app
 */
module.exports = function (app) {

    app.get('/', function (req, res) {
        res.render('index', {user: req.user});
    });

    app.get('/other', function (req, res) {
        res.render('other', {user: req.user});
    });

    app.get('/partial/:name', function (req, res) {
        var name = req.params.name;
        res.render('partials/' + name, {user: req.user});
    });

    app.get('*', function (req, res) {
        logger.info({originalUrl: req.originalUrl}, "General router sending index");
        res.render('index', {user: req.user});
    });

};
