// с помощью этой сущности (User) делаем все операции с БД

const {
    Schema,
    model,
    ObjectId // используется для связи сущностей
} = require('mongoose');

const User = new Schema({
    // id: монгус по умолчанию создаёт айди
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    diskSpace: {type: Number, default: 1024 ** 3 * 10},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
    // ref: 'File' - указали, что ссылается на другую сущность (модель)
    files: [{type: ObjectId, ref: 'File'}]
})

module.exports = model('User', User);