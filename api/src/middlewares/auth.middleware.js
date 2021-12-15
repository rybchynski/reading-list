const ApiErrorsHandler = require('../exceptions/api.errors.handler');
const tokenService = require('../service/token.service');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(ApiErrorsHandler.UnauthorizedError());
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiErrorsHandler.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiErrorsHandler.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiErrorsHandler.UnauthorizedError());
  }
};
