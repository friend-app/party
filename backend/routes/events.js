const express = require('express')
const controller = require('../controllers/events')
const router = express.Router()
const passport = require('passport');

// localhost:4000/api/fetchSingleEvent
router.get('/fetchSingleEvent/:eventId', passport.authenticate('jwt', {session: false}), controller.fetchSingleEvent)

// localhost:4000/api/fetchCreatedEvents
router.get('/fetchCreatedEvents', passport.authenticate('jwt', {session: false}), controller.fetchCreatedEvents)


// localhost:4000/api/createEvent
router.post('/createEvent', passport.authenticate('jwt', {session: false}), controller.createEvent)

// passport.authenticate('jwt', {session: false})



module.exports = router