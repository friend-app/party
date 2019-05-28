const Event = require('../models/Event');
const userChoices = require('../models/Event');

module.exports.fetchCreatedEvents = function(req, res) {
  Event.find({ creatorId: req.user.id })
    .then(events => {
      res.status(201).json({
        message: 'Events Found!',
        events: events
      });
    })
    .catch(error => {
      res.status(404).json({
        message: 'Events Found!',
        error: error
      });
    });
};

module.exports.fetchUserEvents = function(req, res) {
  Event.find({ 'users.user': req.user.id })
    .then(events => {
      res.status(201).json({
        message: 'Events Found!',
        events: events
      });
    })
    .catch(error => {
      res.status(404).json({
        message: 'Events Found!',
        error: error
      });
    });
};

module.exports.fetchSingleEvent = function(req, res, next) {
  Event.findById(req.params.eventId)
    .populate(['users.user'])
    // .populate(['users.userChoices'])
    .then(event => {
      console.log(event);
      res.status(201).json({
        message: 'Events Found!',
        event: event
      });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports.createEvent = function(req, res) {
  const event = new Event(req.body);
  event
    .save()
    .then(event => {
      res.status(201).json({
        message: 'Event Saved!',
        event: event
      });
    })
    .catch(error => {
      console.log(error);
    });
};

module.exports.addIngredientsToEvent = function(req, res) {
  console.log(req.body);
  const ingredients = req.body.ingredients;
  Event.findOneAndUpdate(
    {
      _id: req.body.eventId
    },
    {
      $set: {
        ingredients: ingredients
      }
    },
    { new: true }
  )
    .then(event => {
      res.status(201).json({
        message: 'Ingredients Added',
        event: event
      });
    })
    .catch(error => {
      console.log(error);
    });
};
