var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var session = require('express-session');
var passport = require('passport');

require('./config/passport')(passport);
require('./routes.js')(app);


// Database connection code
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/test');

// set up the handlebars templating
var exphbs  = require('express-handlebars');
app.locals.title = "Login page";
app.engine('hb', exphbs({defaultLayout: 'main.hb'}));
app.set('view engine', 'hb');

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize()); // needed for passport


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});


// create the server and listen
var server = app.listen(8000, function () {

  var host = 'localhost'
  var port = server.address().port

  console.log("app listening at http://%s:%s", host, port)

})
