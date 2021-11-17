const {Schema, model, ObjectId} = require('mongoose');

// монгус по умолчанию создаёт айди

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    diskSpace: {type: Number, default: 1024 ** 3 * 10},
    usedSpace: {type: Number, default: 0},
    avatar: {type: String},
    // ref: 'File' - указали, что ссылается на другую сущность
    files: [{type: ObjectId, ref: 'File'}]
})

module.exports = model('User', User);