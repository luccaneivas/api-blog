const Joi = require('joi');
const { User } = require('../models');
const generateToken = require('../helpers/generateToken');

const Schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const getByEmail = async ({ email, password }) => {
  try {
    const { error } = Schema.validate({ email, password });
    if (error) return { error: { status: 'badRequest', message: error.message } };

    const findEmail = await User.findOne({ where: { email, password } });

    if (!findEmail) return { error: { status: 'badRequest', message: 'Invalid fields' } };

    const token = generateToken({ userId: findEmail.id });

    return token;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getByEmail,
};
