const ApiErrorsHandler = require('../exceptions/api.errors.handler');

module.exports = function (err, req, res, next) {
  if (err instanceof ApiErrorsHandler) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  return res.status(500).json({ message: 'Something went wrong...' });
};
