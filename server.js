// modules =================================================
var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cors = require('cors');   //https://www.npmjs.com/package/cors
var bodyParser = require('body-parser');    //https://www.npmjs.com/package/body-parser
var methodOverride = require('method-override');    //https://github.com/expressjs/method-override
var hbs = require('express-handlebars');
var routes = require('./routes/index');

// configuration ===========================================

var app = express();

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
//mongoose.connect(db.url);
//mongoose.Promise = global.Promise;
mongoose.connect(db.url, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname + '/views/layouts'//,
    //partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
//app.use(express.static(__dirname + '/public'));

// routes ==================================================
//require('./app/routes')(app); // configure our routes
app.use('/', routes);

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Server connected to port ' + port);

// expose app
exports = module.exports = app;
