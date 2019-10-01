var FacebookStrategy = require('passport-facebook').Strategy;

var config = require('../../config/config');

//https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize?answertab=votes#tab-top
module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    passport.use(new FacebookStrategy({
        clientID: config.facebook_api_id,
        clientSecret: config.facebook_api_secret,
        callbackURL: config.callback_url,
        profileFields: ['id', 'displayName']
      },
      function(accessToken, refreshToken, profile, done) {
        var user = {
            'id': profile.id,
            'name': profile.displayName,
            'token': accessToken
        }
        return  done(null, user);
      }
    ));
};