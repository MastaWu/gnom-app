    var passport = require('passport');
    var JwtStrategy = require('passport-jwt').Strategy;
    var ExtractJwt = require('passport-jwt').ExtractJwt;
    var LocalStrategy = require('passport-local');
    var FacebookStrategy = require('passport-facebook').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var bcrypt = require('bcrypt-nodejs');
    var database = require('../../../database/database');
    var config = require('../../../config/config');
    var opts = {};

    var localSignup = new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
        function(req, email, password, done) {
            var queryValues = [];

            queryValues.push(email);
            console.log("Using LocalStrategy: " + email);

            var getUserQuery = {
                sql: "SELECT user_email FROM gnomApp.user WHERE user_email=?",
                values: queryValues
            };

            database.query(getUserQuery, function (existingUser) {
                if (existingUser) {
                    return done(null, false);
                }

                if(req.user) {
                    queryValues.push(bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));
                    queryValues.push(email);

                    console.log("Account has been linked to the email: " + req.user);

                    var connectUserAccountQuery = {
                        sql: "UPDATE gnomApp.user SET user_password=? WHERE user_email=?;",
                        values: queryValues
                    };
                    database.query(connectUserAccountQuery, function(user) {
                        return done(null, user);
                    });
                } else {

                    queryValues.push(bcrypt.hashSync(password, bcrypt.genSaltSync(8), null));

                    var createUserAccountQuery = {
                        sql: "INSERT INTO gnomApp.user SET user_email=?, user_password=?;",
                        values: queryValues
                    };
                    database.query(createUserAccountQuery, function(user) {
                        console.log("New User has been created.");
                        return done(null, user);
                    });
                }
            });
        }
    );

    var localLogin = new LocalStrategy({
        usernameField : 'email'
    },
        function(username, password, done) {
            var queryValues = [];

            queryValues.push(username);
            console.log("Using LocalStrategy: " + username);

            var getUserQuery = {
                sql: "SELECT user_email FROM gnomApp.user WHERE user_email=?",
                values: queryValues
            };

            database.query(getUserQuery, function (results) {
                if(!results) {
                    console.log("Results error in local strategy.");
                    return done(null, false, {
                        error: 'Your login details could not be verified. Please try again. '
                    });
                }

                var validPassword = function(req, results) {
                    return bcrypt.compareSync(results.password, password);
                };
                if(!validPassword) {
                    return done(null, false, {
                        error: 'Your login details could not be verified. Please try again. '
                    });
                } else {
                    // if user password is correct!
                    return done(null, results);
                }
                // if(results){
                //     done(null, user);
                // } else {
                //     done(null, false);
                //     // TODO: Should create a new account here
                // }
            });
        }
    );

    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;

    var jwtLogin = new JwtStrategy(opts, function(jwt_payload, done) {
        var queryValues = [];

        console.log("Using JwtStrategy.");

        queryValues.push(jwt_payload.username);
        console.log("jwt_payload.username: " + jwt_payload.username);

        var getUserQuery = {
            sql: "SELECT user_email FROM gnomApp.user WHERE user_email=?",
            values: queryValues
        };

        database.query(getUserQuery, function(results) {
            if(results){
                console.log("User exists, token passed");
                return done(null, results);
            } else {
                return done(null, false);
                // TODO: Should create a new account here
            }
        });
    });

    var facebookLogin = new FacebookStrategy({
        clientID            : config.facebook.clientID,
        clientSecret        : config.facebook.clientSecret,
        callbackURL         : config.facebook.callbackURL,
        passReqToCallback   : true
    },
    function(req, token, refreshToken, profile, done) {
        var queryValues = [];

        console.log("Someone is attempting to login through the Facebook Strategy.");

        if(req.user){
            queryValues.push(profile.id);
            console.log("Using FacebookStrategy: " + req.email);

            var getFacebookUserQuery = {
                sql: "SELECT * FROM gnomApp.user WHERE facebook_id=?",
                values: queryValues
            };
            database.query(getFacebookUserQuery, function (existingUser) {
                if (existingUser.length > 0 && existingUser) {
                    if (!existingUser.facebook.token) {
                        queryValues = [];
                        queryValues.push(token);
                        queryValues.push(profile.name.givenName);
                        queryValues.push(profile.name.familyName);
                        queryValues.push(profile.emails[0].value);
                        queryValues.push(profile.id);
                        var getUserQuery = {
                            sql: "UPDATE gnomApp.user SET facebook_token=?, user_first_name=?, user_last_name=?, facebook_email=? WHERE facebook_id=?",
                            values: queryValues
                        };

                        database.query(getUserQuery, function (existingUser)
                        {
                            return done(null, existingUser);
                        });
                    }
                    return done(null, existingUser);
                } else {
                    queryValues.push(token);
                    queryValues.push(profile.name.givenName);
                    queryValues.push(profile.name.familyName);
                    queryValues.push(profile.emails[0].value);
                    var createFacebookUserQuery = {
                        sql: "INSERT INTO gnomApp.user SET facebook_id=?, facebook_token=?, user_first_name=?, user_last_name=?, facebook_email=?",
                        values: queryValues
                    };

                    database.query(createFacebookUserQuery, function (newUser)
                    {
                        console.log("New user has been created with Facebook Strategy.");
                        return done(null, newUser);
                    });
                }
            });
        } else {
            queryValues = [];
            queryValues.push(req.user);
            queryValues.push(token);
            queryValues.push(profile.name.givenName);
            queryValues.push(profile.name.familyName);
            queryValues.push(profile.emails[0].value);
            var createFacebookUserQuery = {
                sql: "INSERT INTO gnomApp.user SET facebook_id=?, facebook_token=?, user_first_name=?, user_last_name=?, facebook_email=?",
                values: queryValues
            };

            database.query(createFacebookUserQuery, function (newUser)
            {
                console.log("New user has been created with Facebook Strategy.");
                return done(null, newUser);
            });
        }
    });

    passport.use(localSignup);
    passport.use(jwtLogin);
    passport.use(localLogin);
    // passport.use(facebookLogin);