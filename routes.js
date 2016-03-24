var passport = require('passport');

module.exports = function(app) {




//set routes for bootstrap
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect bootstrap JS
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist')); // redirect JS jQuery
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/css/')); // redirect CSS




app.get('/users', function (req, res) {

   var db = req.db;
   var collection = db.get('test');
   collection.find({},{},function(e,docs){
       res.json(docs);
   });
});


app.get('/user', function(req, res) {
  res.render('user');
});

/* POST to Add User Service */
app.post('/user', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var email = req.body.email;
    var password = req.body.password;

    // Set our collection
    var collection = db.get('users');



    // Submit to the DB
    collection.insert({
        "email" : email,
        "password" : password
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/");
        }
    });
});

// app routes
app.get('/', function (req, res) {
   res.render('sample');

});

//show the login page
app.get('/login', function (req, res) {
   res.render('login');
});

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });

};
