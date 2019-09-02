const express = require('express');
const controller = require('../controllers/events');
const router = express.Router();
const passport = require('passport');

// localhost:4000/api/events/fetchSingleCreatedEvent
router.get(
  '/fetchSingleCreatedEvent/:eventId',
  passport.authenticate('jwt', { session: false }),
  controller.fetchSingleCreatedEvent
);

// localhost:4000/api/events/fetchSingleUserEvent
router.get(
  '/fetchSingleUserEvent/:eventId',
  passport.authenticate('jwt', { session: false }),
  controller.fetchSingleUserEvent
);

// localhost:4000/api/events/fetchCreatedEvents
router.get(
  '/fetchCreatedEvents',
  passport.authenticate('jwt', { session: false }),
  controller.fetchCreatedEvents
);

// localhost:4000/api/events/fetchUserEvents
router.get(
  '/fetchUserEvents',
  passport.authenticate('jwt', { session: false }),
  controller.fetchUserEvents
);

// localhost:4000/api/events/createEvent
router.post(
  '/createEvent',
  passport.authenticate('jwt', { session: false }),
  controller.createEvent
);

// localhost:4000/api/events/updateCreatedEvent
router.post(
  '/updateCreatedEvent',
  passport.authenticate('jwt', { session: false }),
  controller.updateCreatedEvent
);

// localhost:4000/api/events/addIngredientsToEvent
router.put(
  '/addIngredientsToEvent',
  passport.authenticate('jwt', { session: false }),
  controller.addIngredientsToEvent
);

// localhost:4000/api/events/editEvent
router.post(
  '/editEvent',
  passport.authenticate('jwt', { session: false }),
  controller.editEvent
);

// localhost:4000/api/events/addFoodChoices
router.put(
  '/addFoodChoices',
  passport.authenticate('jwt', { session: false }),
  controller.addFoodChoices
);

// localhost:4000/api/events/addDrinkChoices
router.put(
  '/addDrinkChoices',
  passport.authenticate('jwt', { session: false }),
  controller.addDrinksChoices
);

// localhost:4000/api/events/updateUserChoice
router.put(
  '/updateUserChoice',
  passport.authenticate('jwt', { session: false }),
  controller.updateUserChoice
);

// localhost:4000/api/events/createLinkEvent
router.post('/createLinkEvent', controller.createLinkEvent);

// localhost:4000/api/events/eventLink
router.post('/eventLink', controller.getLinkEvent);

// localhost:4000/api/events/updateCreatedEvent
router.post(
  '/addUserToEvent',
  passport.authenticate('jwt', { session: false }),
  controller.addUserToEvent
);

module.exports = router;
