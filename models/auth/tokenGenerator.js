var config = require('../../config/config');
var jwt = require('jsonwebtoken');

exports.generateToken = function(email, role, res) {
    console.log("TokenGenerator: Creating token.");
    console.log("TokenGenerator: Email: " + email);
    console.log("TokenGenerator: Role: " + role);
    jwt.sign({
        email: email,
        role: role
    }, config.secret, {
        algorithm: 'HS512',
        expiresIn: "10h",
        issuer: "gnomgnomgnom"
    }, function(err, token) {
        if(err){
            console.log("TokenGenerator: Error" + err);
            throw err;
        }
        console.log("TokenGenerator: Token created. \n" + token);
        res.status(200).json({
            success: true,
            message: 'Enjoy your token!',
            token: "jwt " + token
        });
    });
};