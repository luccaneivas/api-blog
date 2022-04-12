const Joi = require('joi');
const { Category } = require('../models');

const Schema = Joi.object({
  name: Joi.string().required(),
});

const create = async ({ name }) => {
  try {
    const { error } = Schema.validate({ name });
    if (error) return { error: { status: 'badRequest', message: error.message } };

    const findCategory = await Category.findOne({ where: { name } });

    if (findCategory) {
      return { error: { status: 'conflict', message: 'Category already registered' } };
    }

    const newCategory = await Category.create({ name });

    return newCategory;
  } catch (error) {
    return error;
  }
};

module.exports = {
  create,
};