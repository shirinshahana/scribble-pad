const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/login', userController.login);
router.post('/registration', userController.registration);
router.delete('/', userController.logout);

module.exports = router;

