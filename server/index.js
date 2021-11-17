const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const authRouter = require('./routes/auth.routes.js')

const app = express(); // инициализируем экспресс

// без этого мидлваре экспресс не парсит JSON
app.use(express.json())
// регистрируем обработчик путей
app.use('/api/auth', authRouter);

const PORT = config.get('serverPort');

// Подключение к БД и запуск сервера
// Подключение к БД - асинхронный процесс. Не забываем про async
const startServer = async () => {
    try {
        const DBUrl = config.get("dataBaseURL");
        // Подключение к бд
        await mongoose.connect(DBUrl)

        app.listen(PORT, (req, res) => {
            console.log(`Server started on port ${PORT}. Hurrah!`)
        })
    } catch (e) {
        console.log('Error on start server:', e);
    }
}

startServer();

