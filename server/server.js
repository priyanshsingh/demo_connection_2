const express = require('express')
const port = 4000;
const app = express()
const mongoose = require('mongoose')
require('./config/database')
require('./model/user')

const User = mongoose.model('User')

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/save', (req, res, next)=>{
    const firstName = req.body.user
    const lastName = req.body.user
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    const user = {
        fistName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        email: email
    }

    const userToSave = new User(user)
    userToSave.save()
    .then(user => {
        console.log(`user saved is ${user}`)
        return res.status(200).json({message: "user saved successfully"})
    })
    .catch(err => console.log('error occured while saving user'))

    return res.status('403').json({message: "user saved successfully"})

    // res.status(200).json({status: "success"})
})



app.listen(port, ()=>{
    console.log(`app listening on http://localhost:${port}`)
})