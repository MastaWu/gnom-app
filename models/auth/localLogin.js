var database = require('../../database/database');
var bcrypt = require('bcrypt-nodejs');
var tokenGenerator = require('./tokenGenerator');
var queryValues = [];

exports.localLogin = function(req, res) {

    var queryValues = [];

    // req.param is used for get methods
    queryValues.push(req.body.email);
    queryValues.push(req.body.password);

    console.log("Local Login: Attempting to login with the email: " + req.body.email);

    var getAllUsersQuery = {
        sql: "SELECT user_email, user_password, user_role FROM gnomApp.user WHERE user_email=?",
        values: queryValues
    };

    database.query(getAllUsersQuery, function (results) {
        console.log("Local Login: Finished querying users.");
        console.log("Local Login: Results: \n" + results);

        if(!results || results.length === 0) {
            console.log("Local Login: User not found.");
            res.json({
                success: false,
                message: 'Authentication failed. User not found.'
            });
        } else if (results && results.length > 0) {
            // validate password
            var validPassword = function(req, results) {
                return bcrypt.compareSync(results.password, req.body('password'));
            };
            if(!validPassword) {
                console.log("Local Login: Password incorrect.");
                res.json({
                    success: false,
                    message: 'Authentication failed. User not found.'
                });
            } else {
                console.log("Local Login: Giving token to user.");
                tokenGenerator.generateToken(req.body.email, results.role, res);
            }
        }
    });
};
