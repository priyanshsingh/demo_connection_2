const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    hash: String,
    salt: String,
    email: String,
})


mongoose.model('User', UserSchema)