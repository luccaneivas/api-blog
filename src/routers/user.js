const user = require('express').Router();
const UsersController = require('../controllers/usersController');
const Auth = require('../middlewares/authentication');

user.get('/', Auth, UsersController.getAll);

user.get('/:id', Auth, UsersController.getById);

user.post('/', UsersController.create);

user.delete('/me', Auth, UsersController.deleteUser);

module.exports = user;