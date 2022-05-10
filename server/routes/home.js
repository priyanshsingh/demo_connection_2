const router = require('express').Router()
const utils = require('../lib/utils')
const mongoose = require('mongoose')
const User = mongoose.model('User')

router.use('/', utils.authMiddleware ,async (req, res, next)=>{
    let arr = []
    let arr2 = []
await User.find({}, {blogs: {_id: 0}, _id: 0, firstName: 0, lastName: 0, email: 0, hash: 0, salt: 0, username: 0, __v: 0})
    .then(data=>{
        return res.status(200).json(data[0].blogs)
    })
    .catch(err=>{
        res.status(401).json({message: "unable to load data"})
    })
})

module.exports = router