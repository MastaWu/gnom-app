module.exports = function getAllDeals(req, res) {
    var database = require('../../database/database');
    var getAllDealsQuery = {
        sql: "SELECT * FROM gnom.deal;"
    };

    database.query(getAllDealsQuery, function (results) {
        console.log(results);
        res.status(200).json(results);
    });
};

