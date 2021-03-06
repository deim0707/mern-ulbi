const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const fileUpload = require('express-fileupload');

const authRouter = require('./routes/auth.routes.js')
const fileRouter = require('./routes/file.route')
const corsMiddleware = require('./middlewares/cors.middleware.js')

const app = express(); // инициализируем экспресс

//помогает работать с загрузкой файлов
app.use(fileUpload({}));
// без этого мидлваре экспресс не парсит JSON
app.use(express.json());
// подключаем мидлваре, который отключает корс
app.use(corsMiddleware);
// регистрируем обработчик путей
app.use('/api/auth', authRouter);
app.use('/api/files', fileRouter);

const PORT = config.get('serverPort');

// Подключение к БД и запуск сервера
// Подключение к БД - асинхронный процесс. Не забываем про async
const startServer = async () => {
    try {
        const DBUrl = config.get("dataBaseURL");
        // Подключение к бд
        await mongoose.connect(DBUrl)

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}. Hurrah!`)
        })
    } catch (e) {
        console.log('Error on start server:', e);
    }
}

startServer();

