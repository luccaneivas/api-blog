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

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const { userId } = req.user;

    if (req.body.categoryIds) {
      return next({ status: 'badRequest', message: 'Categories cannot be edited' });
    }

    const response = await PostsService.update({ id, title, content, userId });

    if (!response) return next({ status: 'notFound', message: 'Post does not exist' });

    if (response.error) return next(response.error);

    res.status(200).json(response);
  } catch (error) {
    return next({ status: 'unexpected', message: error.message });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const response = await PostsService.deletePost({ id, userId });

    if (!response) return next({ status: 'notFound', message: 'Post does not exist' });

    if (response.error) return next(response.error);

    res.status(204).end();
  } catch (error) {
    return next({ status: 'unexpected', message: error.message });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
};
