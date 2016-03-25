var passport = require('passport');
var User       = require('./models/user.js');

module.exports = function(app) {

  // app routes
  app.get('/', function (req, res) {
     res.render('sample');

  });


// show the create user page
app.get('/createUser', function(req, res) {
  res.render('createUser');
});

/* POST to Add User Service */
app.post('/createUser', function(req, res) {


    // Get our form values. These rely on the "name" attributes
    var username = req.body.username;
    var password = req.body.password;

    //create our user object
    var user = new User({username: username});
    user.SaveHash(password)
    user.save();

    // show the screen
    res.render('createUser');

});



//show the login page
app.get('/login', function (req, res) {
   res.render('login');
});

// handel the login action
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {

    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    //res.redirect('/users/' + req.user.username);
    res.redirect('/login/' );
  });


};
