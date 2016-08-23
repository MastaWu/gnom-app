module.exports = (function(con) {
    
    const getAllDealsQuery = {
        sql: "SELECT * FROM deal.deal_name WHERE TABLE_NAME='deal';"
    };

    con.query(getAllDealsQuery, function(error, results, fields){
        console.log(results.toJSON());
        res.status(200).json(results);
    });
    
})();