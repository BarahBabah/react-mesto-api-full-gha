require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { SERVER_ERROR } = require('./utils/constants');
const router = require('./routes');

const { PORT = 3000, MONGO_URL = 'mongodb://127.0.0.1/mestodb' } = process.env;
const app = express();
app.use(cors());

mongoose.connect(MONGO_URL);

mongoose.set({ runValidators: true });

app.use(express.json());

router.use(requestLogger); // подключаем логгер запросов
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(router);
router.use(errorLogger); // подключаем логгер ошибок
router.use(errors()); // обработчик ошибок celebrate

// централизованный обработчик ошибок
router.use((err, req, res, next) => {
  const { statusCode = SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500
      ? 'На сервере произошла ошибка'
      : message,
  });
  next();
});
app.listen(PORT, () => {
});
