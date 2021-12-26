const jwt = require('jsonwebtoken');
const token = require('../model/Token');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '10m',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '120m',
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;

      return tokenData.save();
    }
    const t = await token.create({ user: userId, refreshToken });

    return t;
  }

  async removeToken(refreshToken) {
    const tokenData = await token.deleteOne({ refreshToken });

    return tokenData;
  }

  async findToken(refreshToken) {
    const tokenData = await token.findOne({ refreshToken });

    return tokenData;
  }
}

module.exports = new TokenService();
