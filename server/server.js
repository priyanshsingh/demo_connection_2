const express = require('express')
const port = 4000;
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const strategy = require('./config/passport').strategy
const path = require('path')

require('./config/database')
require('./model/user')

const User = mongoose.model('User')

app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'html')
app.engine('html', require('ejs').renderFile)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const GOOGLE_CLIENT_SECRET = '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'
app.use(session({
    secret: GOOGLE_CLIENT_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(strategy)

passport.serializeUser((user, done)=>{
    done(null, user)
})

passport.deserializeUser((user, done)=>{
    done(null, user)
})

app.get('/user/login', (req, res, next)=>{
    res.render('login.ejs')
})

app.get('/user/dashboard', (req, res, next)=>{
    res.render('dashboard.ejs', {name: req.user.displayName || 'jatin'})
})

app.get('/auth/google', 
    passport.authenticate('google', {scope: ['email', 'profile']})
)

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/user/login'
}))
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

app.post('/user/logout', (req, res, next)=>{
    const displayName = req.user.displayName
    req.logOut()
    res.redirect('/user/login')
    console.log(`${displayName} is logged out`)
})

app.listen(port, () => {
    console.log(`app listening on http://localhost:${port}`)
})