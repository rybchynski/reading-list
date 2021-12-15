module.exports = class ApiErrorsHandler extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiErrorsHandler(401, 'Not authorized')
  }

  static BadRequest(message, errors = []) {
    return new ApiErrorsHandler(400, message, errors)
  }
}

