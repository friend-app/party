const Event = require('../models/Event');


module.exports.createEvent = async function(req, res) {
  const event = new Event(req.body);
  event.save()
    .then(event => {
      res.status(201).json({
        message: 'Event Saved!',
        event: event
      });
    })
};
