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

// Getting One
router.get('/:id', getUrl, (req, res) => {
    res.json(res.url)
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


// Creating one
router.post('/', async (req, res) => {
    let newShort = [];
    // iterate 2x because 2x3 =6
    for (let i =0; i < 2; i++) {
      // lower case
      newShort.push(String.fromCharCode(Math.floor(Math.random() *26) + 97));
      // upper case
      newShort.push(String.fromCharCode(Math.floor(Math.random() *26) + 65));
      // numbers
      newShort.push(String.fromCharCode(Math.floor(Math.random() *10)+ 48));
    };
  
    shuffledShort = shuffleArray(newShort);
    shortString =shuffledShort.join('');
    console.log(req.body.original + " is now: " + "https://" + shortString);
  
    const url = new Url({
      original: req.body.original,
      short: shortString,
      count: 1
    })
    try {
      const newUrl = await url.save()
      res.status(201).json(newUrl)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

// standard shuffle array
  function shuffleArray(array) {
  
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
   return array;
  }
  
  
  module.exports = router