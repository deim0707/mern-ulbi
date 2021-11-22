const Router = require('express');
const {check} = require('express-validator');
const authMiddleware = require('../middlewares/authorization.middleware.js'); // идентифицирует пользователя по токену
const authController = require('../controllers/auth.controller');

const router = new Router();

const validationOnRegistrationUser = [
    check('email', "Incorrect email").isEmail(),
    check('password', "Password must be longer than 3 and shorter than 12 symbols").isLength({min: 3, max: 12}),
];

router.post('/registration', validationOnRegistrationUser, authController.registration);
router.post('/login', authController.login);
router.get('/auth', authMiddleware,authController.authorization);


module.exports = router;

