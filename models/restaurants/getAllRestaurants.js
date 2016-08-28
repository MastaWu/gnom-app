module.exports = function getAllRestaurants(req, res) {
    var database = require('../../database/database');
    var getAllRestaurantsQuery = {
        sql: "SELECT * FROM gnom.restaurants;"
    };

    database.query(getAllRestaurantsQuery, function (results) {
        console.log(results);
        res.status(200).json(results);
    });
};

