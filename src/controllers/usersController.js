const UsersService = require('../services/usersService');

const create = async (req, res, next) => {
  try {
    const response = await UsersService.create(req.body);

    if (response.error) return next(response.error);

    res.status(201).json({ token: response });
  } catch (error) {
    return next({ status: 'unexpected', message: error.message });
  }
};

module.exports = {
  create,
};
