const ErrorResponse = require('../utils/errorResponse')

function isAuthenticated(req, res, next) {
       console.log(res.session)
       if (!req.session || !req.session.user) {
              return next(new ErrorResponse(401, 'Please Log In'));
       }
       next();
}

module.exports = isAuthenticated;