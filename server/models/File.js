const {Schema, model, ObjectId} = require('mongoose');

const File = new Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    access_link: {type: String},
    size: {type: Number, default: 0},
    path: {type: String, default: ''},
    // Оба поля ниже ссылаются на другую запись в БД. ref - на какую модель они ссылаются
    user: {type: ObjectId, ref: 'User'},
    parent: {type: ObjectId, ref: 'File'},
    // так указываем, что по полю будет массив
    children: [{type: ObjectId, ref: 'File'}],
})

module.exports = model('File', File)