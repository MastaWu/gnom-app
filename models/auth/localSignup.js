var database = require('../../database/database');
var bcrypt = require('bcrypt-nodejs');
var tokenGenerator = require('./tokenGenerator');
var hashid = require('hashids');
var queryValues = [];

exports.localSignup = function(req, res) {

    queryValues.push(req.body.email);
    console.log(req.body.email);

    var checkEmailQuery = {
        sql: "SELECT user_email FROM gnomApp.user WHERE user_email=?;",
        values: queryValues
    };

    database.query(checkEmailQuery, function (existingUser) {
        console.log(JSON.stringify(existingUser));
        if(existingUser.length > 0 && req.body.email === existingUser[0].user_email) {
            console.log("Sign-up: The email already exists.");
            console.log("Sign-up: " + existingUser[0].user_email);
            return res.status(409).json({ message: 'Email is already taken.' });
        } else {
            console.log("Sign-up: Creating new account.");
            queryValues = [];
            queryValues.push(req.body.email);
            var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(), null);
            console.log("Sign-up: Hash is: " + hash);
            queryValues.push(hash);

            var createNewUserQuery = {
                sql: "INSERT INTO gnomApp.user SET user_email=?, user_password=?, user_role='user';",
                values: queryValues
            };

            database.query(createNewUserQuery, function (res) {
                console.log("Sign-up: Giving token to user.");
                console.log("Sign-up: Response from query: " + JSON.stringify(res));
                tokenGenerator.generateToken(res.insertId, 'user', res);
                console.log("Sign-up: Finished.");
            });
        }
    });
};