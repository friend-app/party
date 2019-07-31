const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  photo: {
    type: String
  }
})

module.exports = mongoose.model('users', usersSchema)