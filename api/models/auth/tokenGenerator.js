// with restaurant information.

var config = require('../../config/config');
var userRole = require('../user/userRole');
var database = require('../../database/database');
var jwt = require('jsonwebtoken');
var Hashids = require('hashids');
var hashids = new Hashids();
var hashedId;
var user = {};

exports.generateToken = function (id, role, res)
{
    console.log("TokenGenerator: Creating token.");
    console.log("TokenGenerator: Id: " + id);
    console.log("TokenGenerator: Role: " + role);
    hashedId = hashids.encode(id);

    if (role === userRole.restaurantOwner)
    {
        var queryValues = [];
        queryValues.push(id);

        var getUserQuery = {
            sql: "SELECT restaurant.restaurant_name FROM gnomApp.restaurant INNER JOIN gnomApp.restaurant_admin admin on admin.restaurant_id = restaurant.restaurant_id INNER JOIN gnomApp.user user on user.user_id = admin.user_id AND user.user_id = ?",
            values: queryValues
        };

        database.query(getUserQuery, function (results)
        {
            console.log("TokenGenerator: User is the restaurant owner of: " + results[0].restaurant_name);
            user = {
                id: hashedId,
                role: role,
                restaurant: results[0].restaurant_name
            };
            jwt.sign(user,
                config.secret, {
                    algorithm: 'HS512',
                    expiresIn: "10h",
                    issuer: "gnomgnomgnom"
                }, function (err, token)
                {
                    if (err)
                    {
                        console.log("TokenGenerator: Error" + err);
                        throw err;
                    }
                    console.log("TokenGenerator: Token created. \n" + token);
                    res.json({
                        token: token,
                        user: user
                    });
                });
        });
    } else
    {
        user = {
            id: hashedId,
            role: role
        };
        jwt.sign(user,
            config.secret, {
                algorithm: 'HS512',
                expiresIn: "10h",
                issuer: "gnomgnomgnom"
            }, function (err, token)
            {
                if (err)
                {
                    console.log("TokenGenerator: Error" + err);
                    throw err;
                }
                console.log("TokenGenerator: Token created. \n" + token);
                res.json({
                    token: token,
                    user: user
                });
            });
    }
};