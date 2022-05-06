const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
})

mongoose.model('User', UserSchema)