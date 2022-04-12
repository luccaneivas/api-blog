const CategoriesService = require('../services/categoriesService');

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
  create,
};