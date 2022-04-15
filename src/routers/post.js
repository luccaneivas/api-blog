const posts = require('express').Router();

const PostsController = require('../controllers/postsController');
const Auth = require('../middlewares/authentication');

posts.get('/', () => {});

posts.get('/:id', () => {});

posts.get('/search', () => {});

posts.post('/', Auth, PostsController.create);

posts.put('/:id', () => {});

posts.delete('/:id', () => {});

module.exports = posts;