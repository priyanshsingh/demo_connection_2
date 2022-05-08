const router = require('./local')

router.use('/user', require('./user'))
router.use('/local', require('./local'))
router.use('/auth', require('./auth'))

module.exports = router