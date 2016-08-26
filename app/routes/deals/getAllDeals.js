module.exports = function getAllDeals(req, res) {
        const database = require('../../database/database');
        const getAllDealsQuery = {
            sql: "SELECT * FROM deal.deal_name WHERE TABLE_NAME='deal';"
        };

        database.query(getAllDealsQuery, function (results) {
            res.status(200).json(results);
        });
};

