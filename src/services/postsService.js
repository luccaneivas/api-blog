const Joi = require('joi');
const { sequelize } = require('../models');

const { BlogPost, PostCategory, Category, User } = require('../models');
const CategoryService = require('./categoriesService');

const Schema = Joi.object({
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
  const { error } = Schema.validate({ title, content, categoryIds });
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
      { model: User, as: 'user', attributes: { exclude: ['password', 'blogId'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
    attributes: { exclude: ['blogId'] },
  });

  return posts;
};

module.exports = {
  create,
  getAll,
};
