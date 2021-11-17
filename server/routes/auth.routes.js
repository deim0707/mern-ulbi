const Router = require('express');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator');
const User = require('../models/User.js');

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
            if(!errors.isEmpty()) {
                return res.status(400).json({message: "Incorrect request", errors})
            }

            const {email, password} = req.body;
            // проверяем, существует ли такой пользователь в базе (с такой почтой)
            // ВСЕ операции с БД асинхронные
            const candidateToNewUser = await User.findOne({email})
            console.log("candidateToNewUser",candidateToNewUser)
            // если пользователь не пустой (есть такая почта в БД), то возвращаем статус 400
            if (candidateToNewUser) {
                return res.status(400).json({message: `User with email ${email} already exist`})
            }

            const hashPassword = await bcrypt.hash(password, 15);
            console.log("hashPassword",hashPassword)
            const user = new User({email, password: hashPassword});
            // сохраняем пользователя в БД
            await user.save();
            return res.json({message: "User was created"});

        } catch (e) {
            console.log(e);
            res.send({message: "Server error", error: e})
        }
    })

module.exports = router;

