const mongoose = require('mongoose')

const FoodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  train: {
    type: String,
    required: false
  },
  bus: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: new Date()
  },
  beautifyDate: {
    type: String,
    default: new Date().toDateString()
  }
})

module.exports = mongoose.model('FoodPlaces', FoodSchema)