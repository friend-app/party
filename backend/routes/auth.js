const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()
const passport = require('passport');

// localhost:4000/api/auth/login
router.post('/login', controller.login)

// localhost:4000/api/auth/register
router.post('/register', controller.register)

// passport.authenticate('jwt', {session: false})


// // localhost:4000/api/events/createEvent
// router.post('/register', passport.authenticate('jwt', {session: false}), controller.createEvent)


module.exports = router