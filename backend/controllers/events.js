const Event = require("../models/Event");
const Link = require("../models/Link");
const uniqid = require("uniqid");
const upload = require('../uploads/storage_model/Storage');

module.exports.fetchCreatedEvents = function(req, res) {
  Event.find({ creatorId: req.user.id })
    .then(events => {
      res.status(201).json({
        message: "Events Found!",
        events: events
      });
    })
    .catch(error => {
      res.status(404).json({
        message: "Events Found!",
        error: error
      });
    });
};

module.exports.fetchUserEvents = function(req, res) {
  Event.find({ "users.user": req.user.id })
    .then(events => {
      res.status(201).json({
        message: "Events Found!",
        events: events
      });
    })
    .catch(error => {
      res.status(404).json({
        message: "Events NOT Found!",
        error: error
      });
    });
};

module.exports.fetchSingleCreatedEvent = function(req, res, next) {
  Event.findById(req.params.eventId)
    .populate(["users.user"])
    .then(event => {
      console.log(event);
      res.status(201).json({
        message: "Events Found!",
        event: event
      });
    })
    .catch(error => {
      res.status(201).json({
        message: "Events Found!",
        event: error
      });
    });
};

module.exports.fetchSingleUserEvent = function(req, res, next) {
  Event.findById(req.params.eventId)
    .populate("users.user", "-password")
    // .populate(['users.userChoices'])
    .then(event => {
      console.log(event);
      res.status(201).json({
        message: "Events Found!",
        event: event
      });
    })
    .catch(error => {
      res.status(201).json({
        message: "Events Found!",
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
        message: "Event Saved!",
        event: event
      });
    })
    .catch(error => {
      console.log(error);
    });
  upload(req,res,function(err) {
    if(err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
};

module.exports.updateCreatedEvent = function(req, res) {
  console.log(req.body);
  Event.findOneAndUpdate(
    {
      _id: req.body.eventId
    },
    {
      $set: req.body.eventDetails
    },
    { new: true, useFindAndModify: false }
  )
    .then(event => {
      res.status(201).json({
        message: "Ingredients Added",
        event: event
      });
    })
    .catch(error => {
      res.status(404).json({
        error: error,
        message: "Ingredients Failed"
      });
    });
};

module.exports.addIngredientsToEvent = function(req, res) {
  console.log(req.body);
  const foodIngredients = req.body.foodIngredients;
  const drinkIngredients = req.body.drinkIngredients;
  const additionalItems = req.body.additionalItems;
  Event.findOneAndUpdate(
    {
      _id: req.body.eventId
    },
    {
      $set: {
        foodIngredients: foodIngredients,
        drinkIngredients: drinkIngredients,
        additionalItems: additionalItems
      }
    },
    { new: true, useFindAndModify: false }
  )
    .then(event => {
      res.status(201).json({
        message: "Ingredients Added",
        event: event
      });
    })
    .catch(error => {
      res.status(404).json({
        error: error,
        message: "Ingredients Failed"
      });
    });
};

module.exports.addFoodChoices = function(req, res) {
  const foodChoice = req.body.foodChoice;
  const eventId = req.body.eventId;
  const userId = req.body.userId;
  Event.findOneAndUpdate(
    {
      _id: eventId,
      "users.user": userId
    },
    {
      $push: {
        "users.$.foodChoices": foodChoice
      }
    },
    { new: true, useFindAndModify: false }
  )
    .then(event => {
      Event.findById(eventId)
        .populate("users.user", "-password")
        .then(event => {
          res.status(201).json({
            message: "Choices Added",
            event: event
          });
        })
        .catch(error => {
          console.log(error);
          res.status(404).json({
            error: error,
            message: "Choices Failed"
          });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        error: error,
        message: "Choices Failed"
      });
    });
};

module.exports.addDrinksChoices = function(req, res) {
  const drinksChoice = req.body.drinksChoice;
  const eventId = req.body.eventId;
  const userId = req.body.userId;
  Event.findOneAndUpdate(
    {
      _id: eventId,
      "users.user": userId
    },
    {
      $push: {
        "users.$.drinksChoices": drinksChoice
      }
    },
    { new: true, useFindAndModify: false }
  )
    .then(event => {
      Event.findById(eventId)
        .populate("users.user", "-password")
        .then(event => {
          res.status(201).json({
            message: "Choices Added",
            event: event
          });
        })
        .catch(error => {
          console.log(error);
          res.status(404).json({
            error: error,
            message: "Choices Failed"
          });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        error: error,
        message: "Choices Failed"
      });
    });
};

module.exports.updateUserChoice = function(req, res) {
  const data = {
    choices: req.body.choices,
    choiceLocationId: req.body.choiceLocationId,
    eventId: req.body.eventId,
  };
  const updateKey = "users.$." +  req.body.type
  console.log('blya', data);
  console.log('shluha', updateKey);
  Event.findOneAndUpdate(
    {
      _id: data.eventId,
      "users._id": data.choiceLocationId,
    },
    {
      $set: { [updateKey]: data.choices }
    },
    { new: true, useFindAndModify: false }
  )
    .then(event => {
      Event.findById(data.eventId)
        .populate("users.user", "-password")
        .then(event => {
          res.status(201).json({
            message: "Choices Added",
            event: event
          });
        })
        .catch(error => {
          console.log(error);
          res.status(404).json({
            error: error,
            message: "Choices Failed"
          });
        });
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        error: error,
        message: "Choices Failed"
      });
    });
};

module.exports.createLinkEvent = function(req, res) {
  const link = new Link({
    link: uniqid(),
    eventId: req.body.eventId
  });
  link
    .save()
    .then(link => {
      res.status(201).json({
        message: "Link Created!",
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
  })
    .then(link => {
      res.status(201).json({
        link: link
      });
    })
    .catch(error => {
      console.log(error);
    });
};


