const Router = require('express').Router;
const userController = require('../controllers/user-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/signup',
    body('password').isLength({min: 3, max: 32}),
    userController.registration
);
router.post('/signin', userController.login);
router.post('/logout', userController.logout);
router.get('/info', authMiddleware, userController.getOneUser);

module.exports = router
