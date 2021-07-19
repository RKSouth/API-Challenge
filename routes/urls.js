const express = require('express')
const router = express.Router()
const Url = require('../models/url')

// Getting all
router.get('/', async (req, res) => {
    try {
      const urls = await Url.find()
      res.json(urls)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })


  async function getUrl(req, res, next) {
    let url
    try {
      url = await Url.findById(req.params.id)
      if (url == null) {
        return res.status(404).json({ message: 'Cannot find url' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.url = url
    next()
  }
  
  module.exports = router