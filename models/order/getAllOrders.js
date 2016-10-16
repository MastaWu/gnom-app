// GET all orders available from the database.
module.exports = function getAllOrders(req, res) {
    console.log("Getting all deal");

    console.log(req.body);

    var database = require('../../database/database');
    var getAllOrdersQuery = {
        sql: "SELECT * FROM gnomApp.order INNER JOIN gnomApp.deal ON gnomApp.order.deal_id = gnomApp.deal.deal_id;"
    };

    database.query(getAllOrdersQuery, function (results) {
        console.log(results);
        res.status(200).json(results);
    });
};
