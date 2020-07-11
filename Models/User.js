const mongoose = require('mongoose');
const Schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    },
    dateOfJoining: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', Schema);