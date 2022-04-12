const user = require('express').Router();
const UsersController = require('../controllers/usersController');

user.get('/', () => {});

user.get('/:id', () => {});

user.post('/', UsersController.create);

user.delete('/me', () => {});

module.exports = user;