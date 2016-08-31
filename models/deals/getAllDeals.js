// GET all deals available from the database.
module.exports = function getAllDeals(req, res) {
    var database = require('.././database');
    var getAllDealsQuery = {
        sql: "SELECT * FROM gnomApp.deal;"
    };

    database.query(getAllDealsQuery, function (results) {
        console.log(results);
        res.status(200).json(results);
    });
};

