class ErrorResponse extends Error {
  constructor(statusCode, msg) {
    super(msg);
    this.msg = msg;
    this.statusCode = statusCode;
  }

  static badRequest(msg) {
    return new ErrorResponse(400, msg);
  }
  static internalError() {
    return new ErrorResponse(500, "Internal server Error");
  }
  static notFound(msg) {
    return new ErrorResponse(404, msg);
  }
}

module.exports = ErrorResponse;
