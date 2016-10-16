// with restaurant information.

var config = require('../../config/config');
var jwt = require('jsonwebtoken');
var Hashids = require('hashids');
var hashids = new Hashids();
var hashedId;

exports.generateToken = function(id, role, res) {
    console.log("TokenGenerator: Creating token.");
    console.log("TokenGenerator: Id: " + id);
    console.log("TokenGenerator: Role: " + role);
    hashedId = hashids.encode(id);

    var user = {
        id: hashedId,
        role: role
    };

    jwt.sign(user,
        config.secret, {
        algorithm: 'HS512',
        expiresIn: "10h",
        issuer: "gnomgnomgnom"
    }, function(err, token) {
        if(err){
            console.log("TokenGenerator: Error" + err);
            throw err;
        }
        console.log("TokenGenerator: Token created. \n" + token);
        res.json({
            token: token,
            user: user
        });
    });
};