const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
  Users: [{ type : mongoose.Schema.Types.ObjectId, ref: 'Users' }]
})

module.exports = mongoose.model('event', eventSchema)