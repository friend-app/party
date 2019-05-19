const express = require('express')
const controller = require('../controllers/events')
const router = express.Router()
const passport = require('passport');


// localhost:4000/api/createEvent
router.post('/createEvent', passport.authenticate('jwt', {session: false}), controller.createEvent)

// passport.authenticate('jwt', {session: false})



module.exports = router