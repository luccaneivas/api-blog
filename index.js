require('dotenv').config();
const express = require('express');

const userRouter = require('./src/routers/user');
const loginRouter = require('./src/routers/login');
const categoriesRouter = require('./src/routers/categories');
const postsRouter = require('./src/routers/post');
const errorMiddleware = require('./src/middlewares/errorHandlerMiddleware');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/categories', categoriesRouter);
app.use('/post', postsRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));