const PostsService = require('../services/postsService');

const create = async (req, res, next) => {
  try {
    const response = await PostsService.create({ ...req.body, userId: req.user.userId });

    if (response.error) return next(response.error);

    res.status(201).json(response);
  } catch (error) {
    return next({ status: 'unexpected', message: error.message });
  }
};

const getAll = async (_req, res, next) => {
  try {
    const response = await PostsService.getAll();

    if (response.error) return next(response.error);

    res.status(200).json(response);
  } catch (error) {
    return next({ status: 'unexpected', message: error.message });
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const response = await PostsService.getById(id);

    if (!response) return next({ status: 'notFound', message: 'Post does not exist' });

    res.status(200).json(response);
  } catch (error) {
    return next({ status: 'unexpected', message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
