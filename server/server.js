const express = require('express')
const port = 4000;
const app = express()
const mongoose = require('mongoose')
require('./config/database')
require('./model/user')

const User = mongoose.model('User')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.post('/save', async (req, res, next) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    const user = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        email: email
    }

    const userToSave = new User(user)
    await userToSave.save()
        .then(user => {
            console.log(`user saved is ${user}`)
            return res.status(200).json({ message: "user saved successfully" })
        })
        .catch(err =>{
            console.log('error occured while saving user ', err)
            return res.status('403').json({ message: "error occured while saving user" })
        }
        )


    // res.status(200).json({status: "success"})
})

app.get('/', async (req, res, next)=>{
    await User.find({})
    .then(data => {
        return res.status(200).json({data: data})
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })

})



app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`)
})