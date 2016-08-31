// GET all restaurants available from the database.
module.exports = function getAllRestaurants(req, res) {
    var database = require('.././database');
    var getAllRestaurantsQuery = {
        sql: "SELECT * FROM gnomApp.restaurant;"
    };

    database.query(getAllRestaurantsQuery, function (results) {
        console.log(results);
        res.status(200).json(results);
    });
};

