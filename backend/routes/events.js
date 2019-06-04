const express = require('express')
const controller = require('../controllers/events')
const router = express.Router()
const passport = require('passport');

// localhost:4000/api/events/fetchSingleEvent
router.get('/fetchSingleEvent/:eventId', passport.authenticate('jwt', {session: false}), controller.fetchSingleEvent);

// localhost:4000/api/events/fetchCreatedEvents
router.get('/fetchCreatedEvents', passport.authenticate('jwt', {session: false}), controller.fetchCreatedEvents);

// localhost:4000/api/events/fetchUserEvents
router.get('/fetchUserEvents', passport.authenticate('jwt', {session: false}), controller.fetchUserEvents);


// localhost:4000/api/events/createEvent
router.post('/createEvent', passport.authenticate('jwt', {session: false}), controller.createEvent);

// localhost:4000/api/events/addIngredientsToEvent
router.post('/addIngredientsToEvent', passport.authenticate('jwt', {session: false}), controller.addIngredientsToEvent);

// localhost:4000/api/events/eventLinkCreate
router.post('/eventLinkCreate', controller.createLinkEvent);

// localhost:4000/api/events/eventLink

router.post('/eventLink', controller.getLinkEvent);






module.exports = router