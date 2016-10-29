// CREATE (POST) deal where id is given from request parameters
// http://stackoverflow.com/questions/17930204/simple-file-upload-to-s3-using-aws-sdk-and-node-express
module.exports = function createDeal(req, res) {
    var database = require('../../database/database');
    var queryValues = [];

    // req.param is used for get methods
    queryValues.push(req.body);
    console.log(queryValues);

    var createDealQuery = {
        sql: "INSERT INTO gnomApp.deal SET ?;",
        values: queryValues
    };

    database.query(createDealQuery, function(results) {
        console.log(results);
        res.status(200).json(results);
    });
};
