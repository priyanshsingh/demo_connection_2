const router = require('express').Router()
const mongoose = require('mongoose')
const User = mongoose.model('User');
const utils = require('../lib/utils')

router.post('/login', utils.validateLogin, function(req, res, next){
    User.findOne({username: req.body.username})
    .then(user => {
        if(!user){
            res.send(401).json({success: false, msg: "could not find user"});
        }
        const isValid = utils.validPassword(req.body.password, user.hash, user.salt)
        if(isValid){
            const tokenObject = utils.isssueJWT(user);
            res.status(200).json({success: true, user: user, token: tokenObject.token, expiresIn: tokenObject.expiresIn})
        }else{
            res.status(401).json({success: false, msg: "incorrect username/password"})
        }        
    })
    .catch((err)=>{
        next(err)
    })
})

router.post('/register', async(req, res, next)=>{

    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const username= req.body.username
    const email = req.body.email
    const password = req.body.password

    const saltHash = utils.genPassword(password);
    const salt = saltHash.salt;
    const hash = saltHash.hash

    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        salt: salt,
        hash: hash
    })

    await newUser.save()
    .then((user)=>{
        const jwt = utils.isssueJWT(user)
        res.json({success: true, user: user, token: jwt.token, expiresIn: jwt.expiresIn})
    })
    .catch(err => next(err))
});

module.exports = router;