const fs = require('fs'); // модуль для работы с файлами с компьютера
const config = require('config');
// const File = require('../models/File'); // Модель файла для работы с БД

class FileService {
    // file - объект модели, что добавляем в БД
    createDirectory(file) {
        // file.user - имя пользователя (или его айди). создание папки под него
        // file.path - относительный путь файла
        const filePath = `${config.get("userFilesPath")}\\${file.user}\\${file.path}`;
        return new Promise((resolve, reject) => {
            try {
                // если файла по такому пути не существует
                if(!fs.existsSync(filePath)) {
                    // тогда мы создаём папку
                    fs.mkdirSync(filePath)
                    return resolve({message: 'File was created'})
                }
                else {
                    return reject({message: 'File already exist'})
                }
            } catch (e) {
                return reject({message: 'File error', e})
            }
        })
    }
}

module.exports = new FileService();