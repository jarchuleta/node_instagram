var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var session = require('express-session');
var passport = require('passport');

require('./config/passport')(passport);
require('./routes.js')(app);


// Database connection code
var mongo = require('mongodb');
//var monk = require('monk');
//var db = monk('localhost:27017/test');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

// set up the handlebars templating
var exphbs  = require('express-handlebars');
app.locals.title = "Login page";
app.engine('hb', exphbs({defaultLayout: 'main.hb'}));
app.set('view engine', 'hb');

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// added to setup passport
app.use(passport.initialize()); // needed for passport


// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});


//set routes for bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/css/')); // redirect CSS


app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!<br>' + err);
});

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {

    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //res.redirect('/users/' + req.user.username);
    res.redirect('/login/' );
  });



// create the server and listen
var server = app.listen(8000, function () {

  var host = 'localhost'
  var port = server.address().port

  console.log("app listening at http://%s:%s", host, port)

})
