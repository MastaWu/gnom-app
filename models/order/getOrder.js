// GET order where id is given from request parameters
module.exports = function getOrder(req, res) {
    var database = require('../../database/database');
    var queryValues = [];

    // req.param is used for get methods
    queryValues.push(req.param.id);
    console.log(queryValues);

    var getOrderQuery = {
        sql: "SELECT * FROM gnomApp.order WHERE order_id = ?;",
        values: queryValues
    };

    database.query(getOrderQuery, function(results) {
        console.log(results);
        res.status(200).json(results);
    });
};
