const fileService = require("../services/file.service");
// const User = require("../models/User");
const File = require("../models/File");

class FileController {
    async createDir(req, res) {
        try {
            const {name, type, parent} = req.body;
            // user.id - берётся из authorization.middleware
            const file = new File({name, type, parent, user: req.user.id});
            // находим родительский файл
            const parentFile = await File.findOne({_id: parent});
            // если родительского файла нет. то файл добавляем в корневую директорию
            if(!parentFile) {
                file.path = name;
                // создаём директорию
                await fileService.createDirectory(file);
            }
            // если родительский файл есть, то
            else {
                file.path = `${parentFile.path}\\${file.name}`;
                await fileService.createDirectory(file);
                // добавляем к родителю ссылку на ребёнка
                parentFile.children.push(file._id);
                // сохраняем\обновляем родительский файл в БД?
                await parentFile.save();
            }
            // сохраянем файл в БД?
            await file.save();
            return res.json(file);
        } catch (e) {
            console.log("error in createDir",e);
            res.status(400).json(e)
        }
    }

    async getFile (req,res) {
        try {
            // ищем файлы по айди пользователя и айди родительской папки
            // айди берём из поля, добавленного мидлваре
            // родителя из квери
            // в ответе будет json с файлами\папками (полученными с бека)
            const files = await File.find({user: req.user.id, parent: req.query.parent});
            return res.json({files});

        } catch (e) {
            console.log('Error in getFile', e);
            return res.status(500).json({message: "Can not get files"})
        }
    }
}

module.exports = new FileController();