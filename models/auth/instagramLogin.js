var database = require('../../database/database');
var bcrypt = require('bcrypt-nodejs');
var request = require('request');
var jwt = require('jsonwebtoken');
var Hashids = require('hashids');
var hashids = new Hashids();
var tokenGenerator = require('./tokenGenerator');
var config = require('../../config/config');
var queryValues = [];
var unhashedIds;

exports.instagramLogin = function(req, res) {
    var accessTokenUrl = 'https://api.instagram.com/oauth/access_token';

    var params = {
        client_id: req.body.clientId,
        redirect_uri: req.body.redirectUri,
        client_secret: config.instagram.secret,
        code: req.body.code,
        grant_type: 'authorization_code'
    };

    request.post( { url: accessTokenUrl, form: params, json: true },
        function(err, response, body) {
            queryValues = [];

            console.log("Instagram Login: Someone is attempting to login with Instagram");
            console.log("Instagram Login: Instagram data: " + JSON.stringify(body) );

            if(req.headers.authorization) {
                console.log("Instagram Login: User has an Authorization header.");
                queryValues.push(body.user.id);

                var getInstagramLocalUserQuery = {
                    sql: "SELECT user_id FROM gnomApp.user WHERE instagram_id=?",
                    values: queryValues
                };
                database.query(getInstagramLocalUserQuery, function (existingUser) {
                    console.log("Instagram Login: Queried database to check for InstagramID(Autherization Header).");

                    var token = req.headers.authorization.split(' ')[1];
                    console.log("Instagram Login: Decode token from Authorization header.");
                    var payload = jwt.verify(token, config.secret, function (err, decoded) {
                        if (err) {
                            res.send({
                                message: err
                            });
                        }

                        queryValues = [];
                        queryValues.push(unhashedIds.decode((decoded.id)));

                        var getUserQuery = {
                            sql: "SELECT user_id, user_email, user_password, user_role FROM gnomApp.user WHERE user_id=?;",
                            values: queryValues
                        };

                        database.query(getUserQuery, function (localUser) {
                            console.log("Instagram Login: Queried database to check for local user with token info.");
                            if (!localUser) {
                                return res.status(400).send({message: 'User not found'});
                            }

                            console.log("Instagram Login: User's token has a valid local user account.");
                            if (existingUser && existingUser.length > 0) {
                                queryValues = [];
                                queryValues.push(body.user.id);
                                queryValues.push(localUser[0].user_email);
                                queryValues.push(localUser[0].user_password);

                                var updateUserQuery = {
                                    sql: "UPDATE gnomApp.user WHERE instagram_id=? SET user_email=?, user_password=?;",
                                    values: queryValues
                                };

                                database.query(updateUserQuery, function (localUser) {
                                    queryValues = [];
                                    queryValues.push(localUser[0].user_id);

                                    var deleteUserQuery = {
                                        sql: "DELETE FROM gnomApp.user WHERE user_id=?;",
                                        values: queryValues
                                    };

                                    database.query(deleteUserQuery, function (deletedUser) {
                                        tokenGenerator.generateToken(localUser[0].user_id, local[0].user_role, res);
                                    });
                                });
                            } else {
                                queryValues = [];
                                queryValues.push(localUser[0].user_id);
                                queryValues.push(body.user.id);

                                var saveUserQuery = {
                                    sql: "UPDATE gnomApp.user WHERE user_id=? SET instagram_id=?;",
                                    values: queryValues
                                };

                                database.query(saveUserQuery, function (localUser) {
                                    console.log("Instagram Login: Updating user info to add Instagram Login. Result:\n" + JSON.stringify(localUser));
                                    tokenGenerator.generateToken(localUser[0].user_id, local[0].user_role, res);
                                });
                            }
                        });
                    });
                });
            } else {
                queryValues = [];
                queryValues.push(body.user.id);

                var getInstagramUserQuery = {
                    sql: "SELECT user_id FROM gnomApp.user WHERE instagram_id=?",
                    values: queryValues
                };
                database.query(getInstagramUserQuery, function (existingUser) {
                    console.log("Instagram Login: Queried database to check for InstagramID.");
                    console.log("Instagram Login: getInstagramUserQuery Results: " + existingUser);
                    if(existingUser && existingUser > 0) {
                        tokenGenerator.generateToken(existingUser[0].user_id, existingUser[0].user_role, res);
                    } else {
                        var userRole = "user"
                        queryValues = [];
                        queryValues.push(body.user.id);
                        queryValues.push(userRole);

                        var saveNewInstagramUserQuery = {
                            sql: "INSERT INTO gnomApp.user SET instagram_id=?, user_role=?;",
                            values: queryValues
                        };

                        database.query(saveNewInstagramUserQuery, function (localUser) {
                            console.log("Instagram Login: getInstagramUserQuery Results: Line126" + localUser);
                            tokenGenerator.generateToken(localUser.insertId, userRole, res);
                        });
                    }
                });
            }
        }
    );
};
