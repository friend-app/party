const Event = require("../models/Event");
const Link = require("../models/Link");
const uniqid = require("uniqid");
const upload = require("../uploads/storage_model/Storage");

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

module.exports.fetchSingleCreatedEvent = async function(req, res, next) {
  try {
    const event = await Event.findById(req.params.eventId).populate([
      "users.user"
    ]);

    if (event) {
      const link = await Link.findOne({ "eventId": req.params.eventId });
      if (link) {
        res.status(201).json({
          message: "Event with link Found!",
          event: event,
          link: link
        });
      } else {
        res.status(201).json({
          message: "Event without link Found!",
          event: event,
        });
      }
    }
  } catch (err) {
    res.status(404).json({
      message: "Events Found!",
      error: err
    });
  }

  // .then(event => {
  //
  // })
  // .catch(error => {
  //   res.status(201).json({
  //     message: "Events Found!",
  //     event: error
  //   });
  // });
};

module.exports.fetchSingleUserEvent = function(req, res, next) {
  Event.findById(req.params.eventId)
    .populate("users.user", "-password")
    // .populate(['users.userChoices'])
    .then(event => {
      if (!event) {
        res.status(404).json({
          message: "Event not Found!",
          event: event
        });
      } else {
        res.status(201).json({
          message: "Event Found!",
          event: event
        });
      }
    })
    .catch(error => {
      res.status(400).json({
        message: "Event not Found!",
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
  // upload(req,res,function(err) {
  //   if(err) {
  //     return res.end("Error uploading file.");
  //   }
  //   res.end("File is uploaded");
  // });
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
    eventId: req.body.eventId
  };
  const updateKey = "users.$." + req.body.type;
  console.log("blya", data);
  console.log("shluha", updateKey);
  Event.findOneAndUpdate(
    {
      _id: data.eventId,
      "users._id": data.choiceLocationId
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

module.exports.createLinkEvent = async function(req, res) {
  const link = new Link({
    link: uniqid(),
    eventId: req.body.eventId
  });
  try {
    const proceedLink = await link.save();
    if (proceedLink) {
      res.status(201).json({
        message: "Link Created!",
        link: proceedLink
      });
    }
  } catch (err) {
    if (err.code === 11000) {
      const proceedLink = await Link.findOne({
        eventId: req.body.eventId
      });
      if (proceedLink) {
        res.status(200).json({
          error: err,
          message: "already exist",
          link: proceedLink
        });
      } else {
        res.status(409).json({
          error: err,
          message: "error accured"
        });
      }
    }
  }

  // .then(link => {
  //   res.status(201).json({
  //     message: "Link Created!",
  //     link: link
  //   });
  // })
  // .catch(error => {
  //   if(error.code === 11000){
  //     res.status(301).json({
  //       error: error,
  //       message: "link already here",
  //     });
  //   } else {
  //     res.status(404).json({
  //       error: error,
  //       message: "somethign wrong",
  //     });
  //   }

  // });
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
