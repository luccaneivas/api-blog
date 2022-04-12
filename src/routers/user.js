const user = require('express').Router();
const UsersController = require('../controllers/usersController');
const Auth = require('../middlewares/authentication');

user.get('/', Auth, UsersController.getAll);

user.get('/:id', () => {});

user.post('/', UsersController.create);

user.delete('/me', () => {});

module.exports = user;