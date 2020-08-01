const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')

// Configure dotenv
dotenv.config({ path: './config/config.env' })


// Middlewares -> Execute a function when we hit a route -> app.use('route', function to execute)
const app = express()
app.use(express.json())
app.use(cors())

const foodsRoute = require('./routes/foods')
app.use('/api/foodplaces', foodsRoute)
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log(`Connected to MongoDB on Port ${process.env.PORT}`)
  })

// Listen to the server
app.listen(process.env.PORT)