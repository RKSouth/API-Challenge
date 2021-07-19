const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
  original: {
    type: String,
    required: true
  },
  short: {
    type: String,
    uniqueItems: true
  },
  count: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('URL', urlSchema)