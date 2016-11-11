// CREATE (POST) deal where id is given from request parameters
// http://stackoverflow.com/questions/17930204/simple-file-upload-to-s3-using-aws-sdk-and-node-express
var Hashids = require('hashids');
var hashids = new Hashids();

module.exports = function createDeal(req, res) {
    var database = require('../../database/database');
    var queryValues = [];

    var decodedId = hashids.decode(req.user.id);
    queryValues.push(decodedId);

    var selectRestaurantId = {
        sql: "SELECT restaurant.restaurant_id FROM gnomApp.restaurant INNER JOIN gnomApp.restaurant_admin admin on admin.restaurant_id = restaurant.restaurant_id INNER JOIN gnomApp.user user on user.user_id = admin.user_id AND user.user_id = ?;",
        values: queryValues
    };

    database.query(selectRestaurantId, function(selectRestaurantResults) {
        console.log("CreateDeal - selectRestaurantResults: " + selectRestaurantResults[0].restaurant_id);
        queryValues = [];

        queryValues.push(selectRestaurantResults[0].restaurant_id);
        queryValues.push(req.body.dealInfo.dealName);
        queryValues.push(req.body.dealInfo.dealPrice);

        // TODO: Set meal_type, food_type, date_start, date_end into real passed in values.

        var insertNewDeal = {
            sql: "INSERT INTO gnomApp.deal(restaurant_id, deal_name, meal_type, food_type, date_start, date_end, price) VALUES (?, ?, 'test', 'test', DATE(NOW()), DATE(NOW()), ?);",
            values: queryValues
        };

        database.query(insertNewDeal, function(newDealResults) {
            console.log("CreatDeal - newDealResults: " + JSON.stringify(newDealResults));
            queryValues = [];

            queryValues.push(newDealResults.insertId);
            queryValues.push(req.body.imageName);

            var insertNewPicture = {
                sql: "INSERT INTO gnomApp.deal_pictures(deal_id, deal_picture_link, deal_picture_upload_date) VALUES (?, ?, DATE(NOW()));",
                values: queryValues
            };
            database.query(insertNewPicture, function(newPictureResults) {
                console.log("CreateDeal - newPictureResults: " + JSON.stringify(newPictureResults));
                res.status(200).send({
                    message: "Successfully created a deal!"
                });
            });
        });
    });
};
