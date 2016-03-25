var passport = require('passport');

module.exports = function(app) {

app.get('/user2', function (req, res) {
  var User       = require('./models/user.js');
  var username = 'user';
  User.find({ username: username }, function(err, user) {
    console.log('here');
    console.log(user);
  });
});


app.get('/user1', function (req, res) {


  var User       = require('./models/user.js');

  var words = ['Bones', 'Psych', 'BigBangTheory', 'Mad Men',
  'Breaking Bad', 'Modern Family', 'Game of Thrones', 'Dexter'];

  var word1 = words[Math.floor(Math.random() * words.length)];
  var word2 = 'james';

  var myUser = new User({ username: word1});
  myUser.SaveHash(word2)
  //fluffy.password = 'james';

  myUser.save(function (err, fluffy) {
    if (err) return console.error(err);


  });

  res.status(200);

});




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

/*
app.post('/login',
  passport.authenticate('local'),
  function(req, res) {

    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/' + req.user.username);
  });*/

};
