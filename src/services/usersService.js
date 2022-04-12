const Joi = require('joi');
const { User } = require('../models');
const generateToken = require('../helpers/generateToken');

const Schema = Joi.object({
  displayName: Joi.string().min(8),
  email: Joi.string().email().required(),
  password: Joi.string().length(6).required(),
});

const create = async ({ displayName, email, password, image }) => {
  try {
    const { error } = Schema.validate({ displayName, email, password });
    if (error) return { error: { status: 'badRequest', message: error.message } };

    const findEmail = await User.findOne({ where: { email } });

    if (findEmail) return { error: { status: 'conflict', message: 'User already registered' } };

    const newUser = await User.create({ displayName, email, password, image });

    const token = generateToken({ userId: newUser.id });

    return token;
  } catch (error) {
    return error;
  }
};

module.exports = {
  create,
};
