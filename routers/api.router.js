var express = require('express')
const aboutRoute = require('./about.router')
const blogRoute = require('./blog.router')
const contactRoute = require('./contact.router')
const imageRoute = require('./image.router')
// const productRoute = require('./product.router')
var apiResponse = require('../helpers/apiResponse')

var app = express()

app.use('/about/', aboutRoute)
app.use('/blog/', blogRoute)
app.use('/contact/', contactRoute)
app.use('/image/', imageRoute)
// app.use('/foodmenu/', foodmenuRoute)
// app.use('/product/', productRoute)

// throw 404 if URL not found
app.all('*', function(req, res) {
  return apiResponse.notFoundResponse(res, 'Page not found')
})
module.exports = app
