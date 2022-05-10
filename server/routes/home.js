const router = require('express').Router()
const utils = require('../lib/utils')
const mongoose = require('mongoose')
const User = mongoose.model('User')

router.use('/', utils.authMiddleware ,async (req, res, next)=>{
    await User.find({})
    .then(data=>{
        return res.status(200).json(data)
    })
    .catch(err=>{
        res.status(401).json({message: "unable to load data"})
    })
})

module.exports = router