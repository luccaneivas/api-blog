const categories = require('express').Router();

const CategoriesController = require('../controllers/categoriesController');
const Auth = require('../middlewares/authentication');

categories.get('/', () => {});

categories.post('/', Auth, CategoriesController.create);

module.exports = categories;