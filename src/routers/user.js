const user = require('express').Router();

user.get('/', () => {});

user.get('/:id', () => {});

user.post('/', () => {});

user.delete('/me', () => {});

module.exports = user;