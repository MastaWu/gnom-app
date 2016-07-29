module.exports = function(app, express, con) {
    require('./main')(app, express, con);
    require('./deals')(app, express, con);
};