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
    console.log("Local Login: Attempting to login with the password: " + req.body.password);

    var getUserQuery = {
        sql: "SELECT user_id, user_password, user_role FROM gnomApp.user WHERE user_email=?",
        values: queryValues
    };

    database.query(getUserQuery, function (results) {
        console.log("Local Login: Finished querying users.");
        console.log("Local Login: Results: \n" + JSON.stringify(results));

        if(!results || results.length === 0) {
            console.log("Local Login: User not found.");
            res.status(401).send({
                message: {
                    password: 'Authentication failed. User not found.'
                }
            });
        } else if (results && results.length > 0) {
            // validate password
            console.log("Local Login: Returned password: " + results[0].user_password);
            console.log("Local Login: Results are present, check for validation.");
            console.log("Local Login: Check for valid password: " + validPassword(req.body.password, results[0].user_password));
            if(!validPassword(req.body.password, results[0].user_password)) {
                console.log("Local Login: Password incorrect.");
                res.status(409).send({
                    message: {
                        password: 'Authentication failed. Password incorrect.'
                    }
                });
            } else {
                console.log("Local Login: Giving token to user.");
                tokenGenerator.generateToken(results[0].user_id, results[0].role, res);
            }
        }

        function validPassword(userPassword, resultsPassword) {
            console.log("Local Login: Password to compare is: " + resultsPassword);
            var result = bcrypt.compareSync(userPassword, resultsPassword);
            console.log("Local Login: Bcrypt compare result: " + result);
            return result;
        }

    });
};
