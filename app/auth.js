var passport = require('passport'),
    BasicStrategy = require('passport-http').BasicStrategy,
    BearerStrategy = require('passport-http-bearer').Strategy,
    db = require('./db');

/**
 * Basic Strategy is used to authenticate registered OAuth clients
 */
passport.use(new BasicStrategy(
    function(username, password, done) {
        db.clients.findByClientId(username, function(err, client) {
            if (err) { return done(err); }
            if (!client) { return done(null, false); }
            if (client.clientSecret !== password) { return done(null, false); }
            return done(null, client);
        });
    }
));

/**
 * Bearer Strategy is used to authenticate users based on an access token
 */
passport.use(new BearerStrategy(function(accessToken, done) {
    db.accessTokens.find(accessToken, function(err, token) {
        if (err) { return done(err); }
        if (!token) { return done(null, false); }

        db.users.find(token.userId, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            var info = { scope: '*' };
            done(null, user, info);
        });
    });
}));
