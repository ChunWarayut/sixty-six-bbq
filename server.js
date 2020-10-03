const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/product.model')
const apiResponse = require('./helpers/apiResponse')
var cors = require('cors')

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://chunwarayut:g6AivOvYDMChDtpZ@cluster0.qitui.gcp.mongodb.net/sixty-six-bbq?retryWrites=true&w=majority'
const PORT = process.env.PORT || 9000

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error', err)
})

app.use(cors())
app.use(express.json())

const apiRouter = require('./routers/api.router')
app.use('/api/', apiRouter)
app.use('/', function (req, res) {
  return apiResponse.successResponse(res, 'Welcome To Sixty Six BBQ')
})
app.all('*', function (req, res) {
  return apiResponse.notFoundResponse(res, 'Page not found')
})
app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`)
})
