//при открытии клиента отправляем по токену пользователя

const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req,res,next) => {
    if(req.method === "OPTIONS") {
        return next()
    }

    try {
        // получаем токен
        // сплитим, чтобы отделить первое слово "бирер". берём только токен
        const token = req.headers.authorization.split(" ")[1];
        if(!token) {
            return res.status(401).json({message: "Authorization error. No token"})
        }
        // декодируем токен
        const decodedToken = jwt.verify(token, config.get("secretKeyForJWT"));
        // ЗДЕСЬ мы проапдейтили запрос. положили в айди декодированный токен пользователя. потом используем его в других файлах
        req.user = decodedToken;
        next();

    } catch (e) {
        return res.status(401).json({message: "Authorization error"})
    }
}