
/**
 * Module dependencies
 */

var express = require('express'),
    logger = require('morgan'),
    path = require('path'),
    http = require('http'),
    https = require('https'),
    api = require('./routes/api'),
    routes = require('./routes'),
    fs = require('fs'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    jade = require('jade');

var app = module.exports = express();

/**
 * Configuration
 */

// Point to the directory which provides the html views and partials
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));

// Point to the directory which should be served for client side request
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.get('/', routes.index);
app.get('/partial/:name', routes.partial);

// JSON API
app.get('/api/name', api.name);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
* Start Server
*/



var privateKey  = fs.readFileSync('security/ssl.key', 'utf8');
var certificate = fs.readFileSync('security/ssl.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};

// your express configuration here

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);