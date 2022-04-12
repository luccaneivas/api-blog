require('dotenv').config();
const express = require('express');

const userRouter = require('./src/routers/user');
const loginRouter = require('./src/routers/login');
const categoriesRouter = require('./src/routers/categories');
const postsRouter = require('./src/routers/post');

const PORT = process.env.PORT || 3000;

const app = express();

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postsRouter);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));