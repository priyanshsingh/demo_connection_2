const router = require('express').Router()
const passport = require('passport')
router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/user/dashboard',
    failureRedirect: '/user/login'
}))

module.exports = router