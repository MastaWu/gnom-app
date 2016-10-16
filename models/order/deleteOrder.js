// DELETE order where id is given from request parameters
module.exports = function deleteOrder(req, res) {
    var database = require('../../database/database');
    var queryValues = [];

    // req.param is used for get methods
    queryValues.push(req.params.id);
    console.log(queryValues);

    var deleteOrderQuery = {
        sql: "DELETE FROM gnomApp.order WHERE deal_id=?;",
        values: queryValues
    };

    database.query(deleteOrderQuery, function(results) {
        console.log(results);
        res.status(200).json(results);
    });
};
