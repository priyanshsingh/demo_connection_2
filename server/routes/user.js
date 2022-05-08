const router = require('express').Router()

router.get('/login', (req, res, next)=>{
   return res.render('login.ejs')
})

router.get('/user/dashboard', (req, res, next) => {
    if (req.isAuthenticated()) {
        return res.redirect("http://localhost:3000/blog")
    }
    return res.redirect("http://localhost:3000/signup")
})

router.post('/logout', (req, res, next) => {
    const displayName = req.user.displayName
    req.logOut()
    res.redirect('/user/login')
    console.log(`${displayName} is logged out`)
})

module.exports = router