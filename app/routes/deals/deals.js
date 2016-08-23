module.exports = function(con) {
    
    const dealRouter = require('express').Router();
    
    dealRouter.get(function(req, res) {
        // Insert mysql statement for retrieve
        con.query("");
        console.log("Sending GET request for deals.")
        res.json({"message" : "\'GET\' deal successful"});
    });
    
    dealRouter.post(function(req, res) {
        
        var dbvariable = req.body.name;
        // Insert mysql statement for post

        res.json({ message: "Item was saved!" });
    });
    
    dealRouter.put(function(req, res) {
        // Insert mysql statement to update
    });
    
    dealRouter.delete(function(req, res) {
        // Insert mysql statement to delete a specific record
        res.json({ message: "Item was deleted!"});
    });
    
    return dealRouter;
};