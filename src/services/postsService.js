const Joi = require('joi');
const { Op } = require('sequelize');
const { sequelize } = require('../models');

const { BlogPost, PostCategory } = require('../models');
const CategoryService = require('./categoriesService');

const createSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const categoryExist = async (ids) => {
  const idsPromises = ids.map((id) => CategoryService.getById(id));

  const categorys = await Promise.all(idsPromises);

  if (categorys.some((cat) => !cat)) return false;
  return true;
};

const create = async ({ title, content, categoryIds, userId }) => {
  const { error } = createSchema.validate({ title, content, categoryIds });
  if (error) return { error: { status: 'badRequest', message: error.message } };

  const verify = await categoryExist(categoryIds);

  if (!verify) return { error: { status: 'badRequest', message: '"categoryIds" not found' } };

  const result = await sequelize.transaction(async (t) => {
    const newPost = await BlogPost.create({ title, content, userId }, { t });

    await Promise.all(categoryIds.map((category) => 
      PostCategory.create({ postId: newPost.id, categoryId: category }), { t }));
      
    return newPost;
  });

  return { id: result.id,
    userId: result.userId,
    title: result.title,
    content: result.content };
};

const getAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      { association: 'user', attributes: { exclude: ['password', 'blogId'] } },
      { association: 'categories', through: { attributes: [] } },
    ],
  });

  return posts;
};

const getById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { association: 'user', attributes: { exclude: ['password', 'blogId'] } },
      { association: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};

const updateSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const update = async ({ id, title, content, userId }) => {
  const { error } = updateSchema.validate({ title, content });
  if (error) return { error: { status: 'badRequest', message: error.message } };

  const post = await getById(id);

  if (post.userId !== userId) {
    return { error: { status: 'unauthorized', message: 'Unauthorized user' } };
  }

  await BlogPost.update({ title, content }, { where: { id } });

  return {
    title, content, userId, categories: post.categories,
  };
};

const deletePost = async ({ id, userId }) => {
  const post = await getById(id);

  if (!post) return null;

  if (post.userId !== userId) {
    return { error: { status: 'unauthorized', message: 'Unauthorized user' } };
  }

  await PostCategory.destroy({
    where: { postId: id },
  });

  await BlogPost.destroy({
    where: { id },
  });

  return true;
};

const search = async (param) => {
  const post = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.substring]: param } },
        { content: { [Op.substring]: param } },
      ],
    },
    include: [
      { association: 'user', attributes: { exclude: ['password', 'blogId'] } },
      { association: 'categories', through: { attributes: [] } },
    ],
  });

  return post;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deletePost,
  search,
};
