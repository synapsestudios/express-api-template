var oauth2orize = require('oauth2orize'),
    passport = require('passport'),
    db = require('./db'),
    utils = require('./utils');

var authServer = oauth2orize.createServer();

authServer.exchange(oauth2orize.exchange.password(
    function(client, username, password, scope, done) {
        db.users.findByUsername(username, function(err, user) {
            if (err) { return done(err); }
            if (!user) { return done(null, false); }
            if (password !== user.password) { return done(null, false); }

            var token = utils.uid(256);
            var refreshToken = utils.uid(256);
            var expirationDate = new Date(new Date().getTime() + (3600 * 1000));
            var CLIENT_ID = 1;
            db.accessTokens.save(token, user.id, CLIENT_ID, function(err) {
                if (err) { return done(err); }
                done(null, token, refreshToken, {expires_in: expirationDate});
            });
        });
    }
));

exports.token = [
    passport.authenticate('basic', { session: false }),
    authServer.token(),
    authServer.errorHandler()
];
