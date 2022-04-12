const posts = require('express').Router();

posts.get('/', () => {});

posts.get('/:id', () => {});

posts.get('/search', () => {});

posts.post('/', () => {});

posts.put('/:id', () => {});

posts.delete('/:id', () => {});

module.exports = posts;