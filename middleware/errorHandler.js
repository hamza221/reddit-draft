const ErrorResponse = require("../utils/errorResponse");

function errorHandler(err, req, res, next) {
  if (err instanceof ErrorResponse) {
    res.status(err.statusCode).json({ msg: err.msg, code: err.statusCode });
    return;
  }

  res.status(500).json({ msg: "internal server", code: 500 });
}

module.exports = errorHandler;
