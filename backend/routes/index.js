const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { login, createUsers } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../middlewares/validate');
const NotFoundError = require('../utils/errors/NotFoundError');

// роуты
router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUsers);

router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
