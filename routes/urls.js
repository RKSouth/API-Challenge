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
  
  // Updating One
router.patch('/:id', getUrl, async (req, res) => {
    if (req.body.original != null) {
      res.url.original = req.body.original
      res.url.count = res.url.count + 1
      console.log("access count: " + res.url.count);
      console.log(res.url.short +" updated to now link to: " + res.url.original)
    }
    try {
      const updatedUrl = await res.url.save()
      res.json(updatedUrl);
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })

//   DELETE ONE
  router.delete('/:id', getUrl, async (req, res) => {
    try {
      await res.url.remove()
      res.json({ message: 'Deleted Url' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
  
  
  module.exports = router