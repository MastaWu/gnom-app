// GET all deals available from the database.
// Get images: http://stackoverflow.com/questions/28356737/retrieving-images-from-amazon-s3-bucket\
// http://stackoverflow.com/questions/6975693/amazon-s3-access-image-by-url
module.exports = function getAllDeals(req, res) {
    console.log("Getting all deal");

    console.log(req.body);

    var database = require('../../database/database');
    var getAllDealsQuery = {
        sql: "SELECT * FROM gnomApp.deal INNER JOIN gnomApp.restaurant ON gnomApp.deal.restaurant_id = gnomApp.restaurant.restaurant_id;"
    };

    database.query(getAllDealsQuery, function (results) {
        console.log(results);
        res.status(200).json(results);
    });
};

