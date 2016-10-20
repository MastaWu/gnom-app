// UPDATE (POST) order where id is given from request parameters
module.exports = function updateOrder(req, res) {
    var database = require('../../database/database');
    var queryValues = [];

    // req.param is used for get methods
    queryValues.push(req.body);
    queryValues.push(req.params.id);
    console.log(queryValues);

    var updateOrderQuery = {
        sql: "UPDATE gnomApp.order SET ? WHERE order_id=?;",
        values: queryValues
    };

    database.query(updateOrderQuery, function(results) {
        console.log(results);
        res.status(200).json(results);
    });
};
