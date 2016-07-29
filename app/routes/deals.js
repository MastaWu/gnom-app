module.exports = function(app, express, con) {
    var dealRouter = express.Router();
    
    dealRouter.route('/deal').get(function(req, res) {
            // Insert mysql statement for retrieve
            console.log("Sending GET request for deals.")
            res.json({"message" : "\'GET\' deal successful"});
        })
        .post(function(req, res) {
            var dbvariable = req.body.name;
            // Insert mysql statement for post

            res.json({ message: "Item was saved!" });
        })
        .put(function(req, res) {
            // Insert mysql statement to update
        })
        .delete(function(req, res) {
            // Insert mysql statement to delete a specific record
        });
    
    app.use('/api', dealRouter);

};