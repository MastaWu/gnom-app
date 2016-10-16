var userRole = require('../user/userRole');

exports.requireRole = function(role) {
    return function(req, res, next) {
        console.log("RequireRole: Current user's role: " + req.user.role);
        console.log("RequireRole: Admin?: " + req.user.role === userRole.admin);
        console.log("RequireRole: userRole: " + userRole.admin);

        if(req.user.role === role || req.user.role === userRole.admin) {
            next();
        } else {
            res.status(403)
                .send({
                    error: "error",
                    message: "User is not authorized"
            });
        }
    };
};
