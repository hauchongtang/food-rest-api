const app = require('./app')
const dotenv = require('dotenv')

// Configure dotenv
dotenv.config({ path: './config/config.env' })
// Listen to the server
app.listen(process.env.PORT)