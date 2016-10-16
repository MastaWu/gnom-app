// DELETE deal where id is given from request parameters
module.exports = function deleteDeal(req, res) {
    var database = require('../../database/database');
    var queryValues = [];

    // req.param is used for get methods
    queryValues.push(req.params.id);
    console.log(queryValues);

    var deleteDealQuery = {
        sql: "DELETE FROM gnomApp.deal WHERE deal_id=?;",
        values: queryValues
    };

    database.query(deleteDealQuery, function(results) {
        console.log(results);
        res.status(200).json(results);
    });
};
