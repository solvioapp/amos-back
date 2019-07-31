module.exports = function(neode) {
    const router = require('express').Router();
    var utils = require('../utils');
    var helper = require('../helper');
    var passport = require('passport')
    , GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
    passport.use(new GoogleStrategy({
        consumerKey: GOOGLE_CONSUMER_KEY,
        consumerSecret: GOOGLE_CONSUMER_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
      },
      function(token, tokenSecret, profile, done) {
          User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
          });
      }
    ));
    
    // To GoTo fb page
    router.get('/', passport.authenticate('google'));

    // To handle callback from FB
    app.get('/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

    return router;
};
