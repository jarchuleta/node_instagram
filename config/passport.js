// local authentication
var LocalStrategy=require('passport-local').Strategy;

module.exports=function(passport) {
    // serializeUser is needed for passport
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    //deserializeUser is needed for passport
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new LocalStrategy( function(username, password, done) {
        // get our model
        var User=require('../models/user.js');

        // here we can manually check user password
        // or use the database
        /*
        if ( username=="user" && password=="pass") {
            return done(null, true);
        }
        else {
            return done(null, false, {
                message: 'Incorrect username.'
            }
            );
        }*/

        // search the users database for a user with the corresponding user name
        User.findOne( {
            'username': username
        }
        , function(err, user) {
            // in case of error
            if (err) {
                return done(err);
            }
            // user not found in databse
            if (!user) {
                return done(null, false, {
                    message: 'User Does not exist'
                }
                );
            }
            // check the password
            if (!user.IsPasswordCorrect(password)) {
                // wrong password
                return done(null, false, {
                    message: 'Incorrect password.'
                }
                );
            }
            // user exists and password is right
            return done(null, true);
        });
    }
    ));
};
