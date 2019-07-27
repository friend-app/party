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
  foodIngredients: {
    type: Array,
    require: false
  },
  drinkIngredients: {
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
  photo: {
    type: String,
    required: true
  },
  users: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
      foodChoices: [{choice: Object}],
      drinksChoices: [{choice: Object}]
    }
  ]
});

module.exports = mongoose.model('event', eventSchema);
