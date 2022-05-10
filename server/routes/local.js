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
    const blogs = req.body.blogs

    const saltHash = utils.genPassword(password);
    const salt = saltHash.salt;
    const hash = saltHash.hash


    User.find({username: username})
    .then(data => {
        console.log(`data is ${data.username} username is ${username}`)
        if(data.username === username){
            return res.status(403).json({status: 403, message: "username already exist"})
        }
    })

    const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        salt: salt,
        hash: hash,
        blogs: blogs,
    })

    await newUser.save()
    .then((user)=>{
        // res.json({success: true, user: user, token: jwt.token, expiresIn: jwt.expiresIn})
        return res.status(200).json({status: "success", message: "user is saved"})
    })
    .catch(err => {
        console.log(err.message)
        res.status(403).json({status: "403", message:"unable to register"})
    })
});

router.patch('/addBlog', async (req, res, next)=>{
    const blog = req.body.blog
    const id = req.body.id
    await User.updateOne({ _id: id },
        {
            $push : {
                blogs: blog
            }
        })
        .then(data=>{
            return res.send(data)
        })
        .catch(err=>{
            console.log("err is ", err.message)
        })
})

module.exports = router;