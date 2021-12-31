const { User } = require('../model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mail.service');
const tokenService = require('./token.service');
const ApiErrorsHandler = require('../exceptions/api.errors.handler');

class UserService {
  #getUserData(user) {
    return {
      id: user._id,
      username: user.username,
      email: user.email,
      isActivated: user.isActivated,
      roles: user.roles || [],
      createdAt: user.created_at,
      logo: user.logo,
    };
  }

  async registration(username, email, password, filename) {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw ApiErrorsHandler.BadRequest(
        `User with email '${email}' already exist.`,
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await User.create({
      username,
      email,
      password: hashPassword,
      activationLink,
      roles: ['authenticated'],
      logo: filename ?? null,
    });
    // await mailService.sendActivationMail(
    //   email,
    //   `${process.env.API_URL}/api/v1/users/activate/${activationLink}`,
    // );
    const userData = this.#getUserData(user);
    const tokens = tokenService.generateTokens({ ...userData });
    await tokenService.saveToken(userData.id, tokens.refreshToken);

    return { ...tokens, user: userData };
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiErrorsHandler.BadRequest('Wrong email or password.');
    }
    const isPassCorrect = await bcrypt.compare(password, user.password);
    if (!isPassCorrect) {
      throw ApiErrorsHandler.BadRequest('Wrong email or password.');
    }
    if (!user.isActivated) {
      throw ApiErrorsHandler.BadRequest(
        'User with this email is not activated.',
      );
    }

    const userData = this.#getUserData(user);
    const tokens = tokenService.generateTokens({ ...userData });
    await tokenService.saveToken(userData.id, tokens.refreshToken);

    return { ...tokens, user: userData };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);

    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiErrorsHandler.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const savedToken = await tokenService.findToken(refreshToken);
    if (!userData || !savedToken) {
      throw ApiErrorsHandler.UnauthorizedError();
    }
    const user = await User.findById(userData.id);
    const userInfo = this.#getUserData(user);
    const tokens = tokenService.generateTokens({ ...userInfo });
    await tokenService.saveToken(userInfo.id, tokens.refreshToken);

    return { ...tokens, user: userInfo };
  }

  async getAllUsers() {
    const users = await User.find();

    return users;
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });
    if (!user) {
      throw ApiErrorsHandler.BadRequest('Incorrect activation link');
    }
    user.isActivated = true;
    await user.save();
  }

  async update(id, body) {
    try {
      await User.findByIdAndUpdate(id, {
        isActivated: body.isActivated,
      });
      const user = User.findById(id);

      return user;
    } catch (err) {
      throw ApiErrorsHandler.BadRequest('Something went wrong.', err);
    }
  }
}

module.exports = new UserService();
