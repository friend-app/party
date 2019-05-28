const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userChoices = new Schema({
  type: Array
});

mongoose.model('userChoices', userChoices);

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: {
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
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
      userChoices: []
    }
  ]
});

module.exports = mongoose.model('event', eventSchema);
