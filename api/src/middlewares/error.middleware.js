const ApiErrorsHandler = require('../exceptions/api.errors.handler');

module.exports = function (err, req, res, next) {
  if (err instanceof ApiErrorsHandler) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  if (err.code === 'INCORRECT_FILETYPE') {
    return res
      .status(422)
      .json({ message: 'Only images with jpeg/jpg/png extension are allowed' });
  }

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(422).json({ message: 'Allow file with max size 500KB' });
  }

  return res.status(500).json({ message: 'Something went wrong...' });
};
