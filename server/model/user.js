const mongoose = require('mongoose')
const blog = {
    title: String,
    content: String
}
const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: {type: String, required: true},
    hash: String,
    salt: String,
    email: String,
    blogs: [
        {
            type: blog
        }
    ]
})


mongoose.model('User', UserSchema)