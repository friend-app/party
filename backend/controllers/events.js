const Event = require('../models/Event');

module.exports.fetchCreatedEvents = function(req, res) {
  Event.find({creatorId: req.user.id})
    .then(events => {
      console.log('blya', events);
      res.status(201).json({
        message: 'Events Found!',
        events: events
      });
    }).catch(error => {
      res.status(404).json({
        message: 'Events Found!',
        error: error
      });
    });
};

module.exports.fetchSingleEvent = function(req, res, next) {
  Event.findById(req.params.eventId)
    .then(event => {
      console.log(event);
      res.status(201).json({
        message: 'Events Found!',
        event: event
      });
    }).catch(error => {
      console.log(error);
    });
};

module.exports.createEvent = function(req, res) {
  const event = new Event(req.body);
  event.save()
    .then(event => {
      res.status(201).json({
        message: 'Event Saved!',
        event: event
      });
    }).catch(error => {
      console.log(error);
    });
};
