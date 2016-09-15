var database = require('../../database/database');
var bcrypt = require('bcrypt-nodejs');
var tokenGenerator = require('./tokenGenerator');
var queryValues = [];

exports.localSignup = function(req, res) {

    queryValues.push(req.body.email);
    console.log(req.body.email);

    var checkEmailQuery = {
        sql: "SELECT user_email FROM gnomApp.user WHERE user_email=?;",
        values: queryValues
    };

    database.query(checkEmailQuery, function (existingUser) {
        if(existingUser.user_email) {
            console.log("Sign-up: The email already exists.");
            console.log("Sign-up: " + existingUser);
            return res.status(409).json({ message: 'Email is already taken.' });
        } else {
            console.log("Sign-up: Creating new account.");
            queryValues = [];
            queryValues.push(req.body.email);
            queryValues.push(bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8), null));

            var createNewUserQuery = {
                sql: "INSERT INTO gnomApp.user SET user_email=?, user_password=?, user_role='user';",
                values: queryValues
            };

            database.query(createNewUserQuery, function (result) {
                console.log("Sign-up: Giving token to user.");
                tokenGenerator.generateToken(req.body.email, 'user', res);
                console.log("Sign-up: Finished.");
            });
        }
    });
};