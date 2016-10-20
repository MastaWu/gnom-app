
var config = require('../../config/config');
var jwt = require('jsonwebtoken');

exports.checkAuth = function(req, res, next) {
    console.log("CheckAuthentication: Checking for authorization to access APIs.");

    if(!req.header('Authorization')) {
        console.log("CheckAuthentication: No Authorization header.");
        return res.status(403).send({err: "error", message: "Unauthorizated User."});
    }

    var token = req.header('Authorization').split(' ')[1];

    jwt.verify(token, config.secret, function(err, decoded) {
        console.log("CheckAuthentication: Token decoded.");
        console.log("CheckAuthentication: Decoded token: " + JSON.stringify(decoded));
        if(err) {
            console.log("CheckAuthentication: Token decode error: " + err.message);
            return res.json({
                success: false,
                message: "Failed to authenticate token."
            });
        } else {
            // if everything is okay, save the request for use in other routes
            req.user = decoded;
            console.log("CheckAuthentication: Token verified.");
            next();
        }
    });
};