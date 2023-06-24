const cardModel = require('../models/card');
const { CREATED, OK } = require('../utils/constants');
const { NotFoundError, ForbiddenError, BadRequestError } = require('../utils/errors');

const getCards = (req, res, next) => {
  cardModel.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(next);
};

const createCard = (req, res, next) => {
  cardModel.create({
    owner: req.user._id,
    ...req.body,
  })
    .then((card) => {
      res.status(CREATED).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для создания карточки'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  cardModel.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена.');
      }

      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужую карточку.');
      }

      return cardModel.findByIdAndDelete(req.params.cardId);
    })
    .then((deletedCard) => {
      res.send(deletedCard);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданы некорректные данные.'));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  cardModel.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => { throw new NotFoundError('Пользователь не найден'); })
    .then((card) => {
      res.status(CREATED).send(card);
    }).catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Передан несуществующий _id карточки'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => cardModel.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
).orFail(() => { throw new NotFoundError('Пользователь не найден'); })
  .then((card) => {
    res.status(OK).send(card);
  }).catch((err) => {
    if (err.name === 'CastError') {
      return next(new BadRequestError('Передан несуществующий _id карточки'));
    }
    return next(err);
  });

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
