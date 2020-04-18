const mongoose = require('mongoose');
const { Schema } = mongoose;

const users = new Schema({
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {
    timestamps: true
});


module.exports = mongoose.model('Users', users);