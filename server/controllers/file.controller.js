const fileService = require("../services/file.service");
const config = require("config");
const fs = require("fs");
const User = require("../models/User");
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
            if (!parentFile) {
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
            console.log("error in createDir", e);
            res.status(400).json(e)
        }
    }

    async getFile(req, res) {
        try {
            // ищем файлы по айди пользователя и айди родительской папки
            // айди берём из поля, добавленного мидлваре
            // родителя из квери
            // в ответе будет json с файлами\папками (полученными с бека)
            const files = await File.find({user: req.user.id, parent: req.query.parent});
            return res.json(files);

        } catch (e) {
            console.log('Error in getFile', e);
            return res.status(500).json({message: "Can not get files"})
        }
    }

    async uploadFile(req, res) {
        try {
            const file = req.files.file;
            //находим родительскую директорию. куда сохраняем файл
            // ищем по айди, который мы сами ранее записали в req в мидлВаре. из токена
            // берётся из поля parent в запросе
            const parent = await File.findOne({user: req.user.id, _id: req.body.parent});
            // находим пользователя, чтобы проверить, есть у него свободное место на диске или нет
            const user = await User.findOne({_id: req.user.id});
            const isEnoughSpaceInDisk = user.usedSpace + file.size > user.diskSpace;
            if(isEnoughSpaceInDisk) {
                return res.stack(400).json({message: "Not enough disk space for this user"})
            }
            user.usedSpace = user.usedSpace + file.size;
            //здесь образуем путь, куда будем класть файл
            let path;
            if(parent) {
                path=`${config.get("userFilesPath")}\\${user._id}\\${parent.path}\\${file.name}`
            } else {
                path=`${config.get("userFilesPath")}\\${user._id}\\${file.name}`
            }

            //проверяем, существует ли файл с таким названием по такому пути
            if(fs.existsSync(path)) {
                return res.stack(400).json({message: "File already exist"})
            }
            //перемещаем файл по ранее созданному пути
            file.mv(path)

            // получаем расширение файла
            const type = file.name.split('.').pop();
            // создаём модель файла, которую сохраним в БД
            const dbFile = new File({
                name: file.name,
                type,
                size: file.size,
                path: parent?.path,
                parent: parent?._id,
                user: user._id
            });
            await dbFile.save();
            await user.save();

            res.json(dbFile)
        } catch (e) {
            console.log('Error in uploadFile', e);
            return res.status(500).json({message: "Upload error"})
        }
    }
}

module.exports = new FileController();