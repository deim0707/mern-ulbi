const Router = require('express');
const authMiddleware = require('../middlewares/authorization.middleware.js'); // идентифицирует пользователя по токену
const fileController = require('../controllers/file.controller');

const router = new Router();

// второй параметр - мидлваре - нужен для авторизации пользователья
router.post('', authMiddleware, fileController.createDir);
router.get('', authMiddleware, fileController.getFile);

module.exports = router;