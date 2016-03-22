var express = require('express');
var app = express();
var bodyParser  = require('body-parser');


// set up the handlebars templating
var exphbs  = require('express-handlebars');
app.locals.title = "Login page";
app.engine('hb', exphbs({defaultLayout: 'main.hb'}));
app.set('view engine', 'hb');

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//set routes for bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/css/')); // redirect CSS




// app routes
app.get('/', function (req, res) {
   res.render('sample');
})

//show the login page
app.get('/login', function (req, res) {
   res.render('login');
})

//handle the login
app.post('/login', function (req, res) {
   res.json(req.body);
})


// create the server and listen
var server = app.listen(8000, function () {

  var host = 'localhost'
  var port = server.address().port

  console.log("app listening at http://%s:%s", host, port)

})
