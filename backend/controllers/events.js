const Event = require('../models/Event');
const Link = require('../models/Link');
const uniqid = require('uniqid');

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
        message: 'Events NOT Found!',
        error: error
      });
    });
};

module.exports.fetchSingleCreatedEvent = function(req, res, next) {
  Event.findById(req.params.eventId)
    .populate(['users.user'])
    .then(event => {
      console.log(event);
      res.status(201).json({
        message: 'Events Found!',
        event: event
      });
    })
    .catch(error => {
      res.status(201).json({
        message: 'Events Found!',
        event: error
      });
    });
};

module.exports.fetchSingleUserEvent = function(req, res, next) {
  Event.findById(req.params.eventId)
    .populate('users.user','-password')
    // .populate(['users.userChoices'])
    .then(event => {
      console.log(event);
      res.status(201).json({
        message: 'Events Found!',
        event: event
      });
    })
    .catch(error => {
      res.status(201).json({
        message: 'Events Found!',
        event: error
      });
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
  const additionalItems = req.body.additionalItems;
  Event.findOneAndUpdate(
    {
      _id: req.body.eventId
    },
    {
      $set: {
        ingredients: ingredients,
        additionalItems: additionalItems
      }
    },
    { new: true, useFindAndModify: false }
  )
    .then(event => {
      res.status(201).json({
        message: 'Ingredients Added',
        event: event
      });
    })
    .catch(error => {
      res.status(404).json({
        error: error,
        message: 'Ingredients Failed'
      });
    });
};

module.exports.addUserChoices = function(req, res) {
  const userChoice = req.body.userChoice;
  const eventId = req.body.eventId;
  const userId = req.body.userId;
  Event.findOneAndUpdate(
    {
      _id: eventId,
      'users.user': userId
    },
    {
      $push: {
        'users.$.userChoices': userChoice
      }
    },
    { new: true, useFindAndModify: false }
  )
    .then(event => {
      Event.findById(eventId)
        .populate(['users.user'])
        .then(event => {
          res.status(201).json({
            message: 'Choices Added',
            event: event
          });
        })
        .catch(error => {
          console.log(error);
          res.status(404).json({
            error: error,
            message: 'Choices Failed'
          });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        error: error,
        message: 'Choices Failed'
      });
    });
};


module.exports.createLinkEvent = function(req, res) {
    const link = new Link({
        link: uniqid(),
        eventId: req.body.eventId
    });
    link.save()
        .then(link => {
            res.status(201).json({
                message: 'Link Created!',
                link: link
            });
        })
        .catch(error => {
            console.log(error);
        });
};

module.exports.getLinkEvent = function(req, res) {
    Link.findOne({
        link: req.body.link
    }).then(
        link => {
            res.status(201).json({
                link: link
            });
        }
    ).catch(
        error => {
            console.log(error);
        }
    );
};
