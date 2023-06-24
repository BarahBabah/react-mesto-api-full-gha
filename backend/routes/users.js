const router = require('express').Router();
const usersConroller = require('../controllers/users');
const { validateUserId, validateUserInfo, validateAvatar } = require('../middlewares/validate');

router.get('/', usersConroller.getUsers);

router.get('/me', usersConroller.getUserById);

router.get('/:user_id', validateUserId, usersConroller.getUserById);

router.patch('/me', validateUserInfo, usersConroller.updateUser);

router.patch('/me/avatar', validateAvatar, usersConroller.updateAvatar);

module.exports = router;
