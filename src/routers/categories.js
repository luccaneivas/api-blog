const categories = require('express').Router();

const CategoriesController = require('../controllers/categoriesController');
const Auth = require('../middlewares/authentication');

categories.get('/', Auth, CategoriesController.getAll);

categories.post('/', Auth, CategoriesController.create);

module.exports = categories;