/* eslint-disable consistent-return */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const { DUPLICATE_KEY_ERROR, CREATED, OK } = require('../utils/constants');
const { BadRequestError, ConflictUserError, NotFoundError } = require('../utils/errors');
const { SECRET_KEY, JWT_EXPIRES } = require('../utils/config');

const { JWT_SECRET, NODE_ENV } = process.env;

const getUserById = (req, res, next) => {
  let action;

  if (req.path === '/me') {
    action = req.user._id;
  } else {
    action = req.params.user_id;
  }
  userModel.findById(action)
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((user) => {
      res.status(OK).send(user);
    }).catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError(`Некорректный id' ${action}`));
      }
      next(err);
    });
};

const getUsers = (req, res, next) => {
  userModel.find({}).then((users) => {
    res.send(users);
  })
    .catch(next);
};

const createUsers = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    userModel.create({
      name, about, email, avatar, password: hash,
    })
      .then(() => {
        res.status(CREATED).send({
          name, about, email, avatar,
        });
      })
      .catch((err) => {
        if (err.code === DUPLICATE_KEY_ERROR) {
          return next(new ConflictUserError('Пользователь с таким email уже существует'));
        }
        if (err.name === 'ValidationError') {
          return next(new BadRequestError('Некорректные данные при создании пользователя'));
        }
        next(err);
      });
  });
};

const login = (req, res, next) => {
  const { password, email } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,

        {
          expiresIn: JWT_EXPIRES,
        },
      );
      res.send({ token });
    }).catch(next);
};

const updateAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  userModel.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true, runValidators: true },
  ).orFail(() => {
    throw new NotFoundError('Пользователь не найден');
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') next(new BadRequestError('Переданы некорректные данные'));
      else next(err);
    });
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  userModel.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  ).orFail(() => {
    throw new NotFoundError('Переданы некорректные данные');
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getUserById,
  getUsers,
  createUsers,
  updateUser,
  updateAvatar,
  login,
};
