const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
    type: Array,
    require: false
  },
  additionalItems: {
    type: Array,
    require: false
  },
  creatorId: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  users: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
      userChoices: [{choice: Object}]
    }
  ]
});

module.exports = mongoose.model('event', eventSchema);
