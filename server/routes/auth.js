const {signupUser, signinUser, refreshToken} = require('../controller/authController')
const router = require('express').Router();



router.post('/login', signinUser)
router.post('/signup',  signupUser)
router.post('/refresh',  refreshToken)

module.exports = router;