const router = require('express').Router();
const cardsConroller = require('../controllers/cards');
const { validateCard, validateCardId } = require('../middlewares/validate');

router.get('/', cardsConroller.getCards);

router.post('/', validateCard, cardsConroller.createCard);

router.delete('/:cardId', validateCardId, cardsConroller.deleteCard);

router.put('/:cardId/likes', validateCardId, cardsConroller.likeCard);

router.delete('/:cardId/likes', validateCardId, cardsConroller.dislikeCard);

module.exports = router;
