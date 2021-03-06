const router = require('./local')

router.use('/user', require('./user'))
router.use('/local', require('./local'))
router.use('/auth', require('./auth'))
router.use('/', require('./home'))

module.exports = router