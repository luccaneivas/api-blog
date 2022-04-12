const login = require('express').Router();

const LoginController = require('../controllers/loginController');

login.post('/', LoginController.getByEmail);

module.exports = login;