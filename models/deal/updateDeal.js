// UPDATE (POST) deal where id is given from request parameters
module.exports = function updateDeal(req, res) {
    var database = require('../../database/database');
    var queryValues = [];

    // req.param is used for get methods
    queryValues.push(req.body);
    queryValues.push(req.params.id);
    console.log(queryValues);

    var updateDealQuery = {
        sql: "Update gnomApp.deal SET ? WHERE deal_id=?;",
        values: queryValues
    };

    database.query(updateDealQuery, function(results) {
        console.log(results);
        res.status(200).json(results);
    });
};
