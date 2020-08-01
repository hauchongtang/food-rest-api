const express = require('express')
const router = express.Router()

// Import schemas
const FoodPlaces = require('../models/FoodPlaces')
const { request } = require('express')

// Routes
// Get a specific foodplace by id
router.get('/:id', async (req, res) => {
  try {
    const findFoodPlace = await FoodPlaces.findById(req.params.id)
    res.status(200).json({
      success: true,
      data: findFoodPlace
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    })
  }
})

// Get our foodplaces from DB -> **Apart from .find() theres lots of other functions too**
router.get('/', async (req, res) => {
  try {
    const foodPlaces = await FoodPlaces.find()
    res.status(201).json({
      success: true,
      data: foodPlaces
    })
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
})

// Post a new food place to DB
router.post('/', async (req, res) => {
  // console.log(req.body)
  const postFoodPlaces = new FoodPlaces({
    name: req.body.name,
    genre: req.body.genre,
    location: req.body.location,
    country: req.body.country,
    train: req.body.train,
    bus: req.body.bus
  })

  try {
    const savedFoodPlaces = await postFoodPlaces.save()
    res.status(201).json({
      success: true,
      data: savedFoodPlaces
    })
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
})

// Delete a foodplace by id
router.delete('/:id', async (req, res) => {
  try {
    const deleteFoodPlace = await FoodPlaces.remove({ _id: req.params.id })
    res.status(200).json({
      success: true,
      data: deleteFoodPlace
    })
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
})

// Update a foodplace by id
router.patch('/:id', async (req, res) => {
  try {
    const updatedFoodPlace = await FoodPlaces.updateOne({ _id: req.params.id }, {
      $set: {
        name: req.body.name,
        genre: req.body.genre,
        country: req.body.country,
        location: req.body.location,
        bus: req.body.bus,
        train: req.body.train
      }
    })
    res.status(200).json({
      success: true,
      data: updatedFoodPlace
    })
  } catch (error) {
    res.status(400).json({
      message: error
    })
  }
})

module.exports = router