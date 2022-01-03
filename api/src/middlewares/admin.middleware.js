const { User } = require('../model');
const ApiErrorsHandler = require('../exceptions/api.errors.handler');
const tokenService = require('../service/token.service');

module.exports = async (req, res, next) => {
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

    // todo: check if userData has roles field (we do not need to use additional db query).
    const user = await User.findOne({ _id: userData.id });
    if (!user) {
      return next(ApiErrorsHandler.UnauthorizedError());
    }

    if (!user.roles.includes('admin')) {
      return next(ApiErrorsHandler.UnauthorizedError());
    }

    next();
  } catch (e) {
    return next(ApiErrorsHandler.UnauthorizedError());
  }
};
