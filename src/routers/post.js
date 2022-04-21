const posts = require('express').Router();

const PostsController = require('../controllers/postsController');
const Auth = require('../middlewares/authentication');

posts.get('/', Auth, PostsController.getAll);

posts.get('/:id', Auth, PostsController.getById);

posts.get('/search', () => {});

posts.post('/', Auth, PostsController.create);

posts.put('/:id', () => {});

posts.delete('/:id', () => {});

module.exports = posts;