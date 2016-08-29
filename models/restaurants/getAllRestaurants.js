// GET all restaurants available from the database.
module.exports = function getAllRestaurants(req, res) {
    var database = require('../../database/database');
    var getAllRestaurantsQuery = {
        sql: "SELECT * FROM gnom.restaurant;"
    };

    database.query(getAllRestaurantsQuery, function (results) {
        console.log(results);
        res.status(200).json(results);
    });
};

