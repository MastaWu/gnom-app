// GET all restaurants available from the database.
module.exports = function getAllUsers(req, res) {
    var database = require('../../database');
    var getAllUsersQuery = {
        sql: "SELECT * FROM gnomApp.user;"
    };

    database.query(getAllUsersQuery, function (results) {
        console.log(results);
        res.status(200).json(results);
    });
};
