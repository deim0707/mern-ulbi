const Router = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const authMiddleware = require('../middlewares/authorization.middleware.js');

const router = new Router();

router.post(
    '/registration',
    [
        check('email', "Incorrect email").isEmail(),
        check('password', "Password must be longer than 3 and shorter than 12 symbols").isLength({min: 3, max: 12}),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Incorrect request", errors})
            }

            const {email, password} = req.body;
            // проверяем, существует ли такой пользователь в базе (с такой почтой)
            // ВСЕ операции с БД асинхронные
            const candidateToNewUser = await User.findOne({email})
            // если пользователь не пустой (есть такая почта в БД), то возвращаем статус 400
            if (candidateToNewUser) {
                return res.status(400).json({message: `User with email ${email} already exist`})
            }

            // второй аргумент - 8 - степень хеширования. чем больше, тем дольше работает
            const hashPassword = await bcrypt.hash(password, 8);
            const user = new User({email, password: hashPassword});
            // сохраняем пользователя в БД
            await user.save();
            return res.json({message: "User was created"});

        } catch (e) {
            console.log(e);
            res.send({message: "Server error", error: e})
        }
    })

router.post(
    '/login',
    async (req, res) => {
        try {
            const {email, password} = req.body;
            // Ищем пользователя по почте
            const user = await User.findOne({email});
            if (!user) {
                return res.status(404).json({message: 'User not found'})
            }
            // Сравниваем пароль полученный в запросе с паролем из БД
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({message: 'Password not valid'})
            }
            // Пользователь существует. пароль корректен. можем создать jwt-токен.
            // Первый парметр объект с полем - id - объект с данными, которым помещаем в токен, в нашем случае - айди пользователя.
            // Вторым параметром, секретный код, по которому идёт шифрование. Это любая рандомная строка
            // Третьем параметров объект expiresIn - указывает, сколько живет токен
            const token = jwt.sign({id: user.id}, config.get("secretKeyForJWT"), {expiresIn: "1h"});

            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar,
                }
            })

        } catch (e) {
            console.log(e);
            res.send({message: "Server error", error: e})
        }
    })

router.get(
    '/auth',
    authMiddleware,
    async (req, res) => {
        try {
            // req.user.id - мидлвар из второго параметра добавил поле user в запрос
            const user = await User.findOne({_id: req.user.id})
            // создаём токен заново и отправляем пользователя в ответ
            // Первый парметр объект с полем - id - объект с данными, которым помещаем в токен, в нашем случае - айди пользователя.
            // Вторым параметром, секретный код, по которому идёт шифрование. Это любая рандомная строка
            // Третьем параметров объект expiresIn - указывает, сколько живет токен
            const token = jwt.sign({id: user.id}, config.get("secretKeyForJWT"), {expiresIn: "1h"});

            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar,
                }
            })
        } catch (e) {
            console.log(e);
            res.send({message: "Server error", error: e})
        }
    })



module.exports = router;

