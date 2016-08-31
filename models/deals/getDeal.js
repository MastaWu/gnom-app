// GET deal where id is given from request parameters
module.exports = function getDeal(req, res) {
    var database = require('.././database');
    var queryValues = [];

    // req.param is used for get methods
    queryValues.push(req.param('id'));
    console.log(queryValues);

    var getDealQuery = {
        sql: "SELECT * FROM gnomApp.deal WHERE deal_id = ?;",
        values: queryValues
    };

    database.query(getDealQuery, function(results) {
        console.log(results);
        res.status(200).json(results);
    });
};