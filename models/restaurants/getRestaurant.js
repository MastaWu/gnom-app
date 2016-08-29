// GET deal where id is given from request parameters
module.exports = function getRestaurant(req, res) {
    var database = require('../../database/database');
    var queryValues = [];

    // req.param is used for get methods
    queryValues.push(req.param('id'));
    console.log(queryValues);

    var getDealsQuery = {
        sql: "SELECT * FROM gnom.restaurant WHERE restaurant_id = ?;",
        values: queryValues
    };

    database.query(getDealsQuery, function(results) {
        console.log(results);
        res.status(200).json(results);
    });
};