module.exports = function(neode) {
    const router = require('express').Router();
    var utils = require('../utils');
    var helper = require('../helper');
    var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;
    passport.use(new FacebookStrategy({
        clientID: 480063456075536,
        clientSecret: 'b817e8de9f3ae3de77c82802e2797638',
        callbackURL: "http://localhost:3000/api/v1/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, done) {
          const user ={
              accessToken,
              refreshToken,
              profile
          }
          console.log(user)
          done(null, user);
      }
    ));
    
    // To GoTo fb page
    router.get('/', passport.authenticate('facebook', { scope: 'email' }));

    // To handle callback from FB
    router.get('/callback', passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

    return router;
};
