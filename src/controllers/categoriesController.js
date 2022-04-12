const CategoriesService = require('../services/categoriesService');

const getAll = async (req, res, next) => {
  try {
    const response = await CategoriesService.getAll();

    res.status(200).json(response);
  } catch (error) {
    return next({ status: 'unexpected', message: error.message });
  }
};

const create = async (req, res, next) => {
  try {
    const response = await CategoriesService.create(req.body);

    if (response.error) return next(response.error);

    res.status(201).json(response);
  } catch (error) {
    return next({ status: 'unexpected', message: error.message });
  }
};

module.exports = {
  getAll,
  create,
};