module.exports = function(app, express, con){
    var mainRouter = express.Router();

    // Middleware set-up
    mainRouter.use(function(req, res, next) {
        console.log("Middleware");
        next();
    });

    // Route to test that GET works
    mainRouter.get('/', function (req, res)
    {
        res.json({message: '\'GET\' works'});
        console.log("Sending \'GET\' request for main page.");
    });
    
    app.use('/api', mainRouter);
};