const boom = require('boom');
const tokenService = require('../service/token.service');
const ObjectId = require('mongodb').ObjectId;
const ApiErrorsHandler = require('../exceptions/api.errors.handler');

const getUserObjId = (req) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new ApiErrorsHandler.UnauthorizedError();
    }

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) {
      throw new ApiErrorsHandler.UnauthorizedError();
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new ApiErrorsHandler.UnauthorizedError();
    }

    return new ObjectId(userData.id);
  } catch (err) {
    return res.status(400).send(boom.boomify(err));
  }
};

const mainCrud = (model, { get = '', getAll = '' } = {}) => ({
  async get({ params: { id } }, res) {
    try {
      const item = await model.findById(id).populate(get);
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async getAll(req, res) {
    try {
      const userId = getUserObjId(req);

      const items = await model.find({ owner: userId }).populate(getAll);
      return res.status(200).send(items);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async create({ body }, res) {
    try {
      const item = new model(body);
      const newItem = await item.save();
      return res.status(200).send(newItem);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async update({ params: { id }, body }, res) {
    try {
      const item = await model.findByIdAndUpdate(id, body, { new: true });
      return res.status(200).send(item);
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },

  async delete({ params: { id } }, res) {
    try {
      await model.findByIdAndDelete(id);
      return res.status(200).send({ status: 'ok', message: 'Item deleted...' });
    } catch (err) {
      return res.status(400).send(boom.boomify(err));
    }
  },
});

module.exports = mainCrud;
