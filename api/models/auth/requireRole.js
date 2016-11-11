var userRole = require('../user/userRole');

exports.requireRole = function(role) {
    return function(req, res, next) {
        console.log("RequireRole - Current user's role: " + req.user.role);

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
