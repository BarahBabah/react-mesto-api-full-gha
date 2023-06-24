const router = require('express').Router();
const { errors } = require('celebrate');
const { SERVER_ERROR } = require('../utils/constants');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUsers } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../middlewares/validate');
const { NotFoundError } = require('../utils/errors');
const { requestLogger, errorLogger } = require('../middlewares/logger');

router.use(requestLogger); // подключаем логгер запросов

// роуты
router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUsers);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
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

module.exports = router;
