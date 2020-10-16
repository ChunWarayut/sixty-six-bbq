var express = require('express')
const aboutRoute = require('./about.router')
const foodmenuRoute = require('./foodmenu.router')
const blogRoute = require('./blog.router')
// const productRoute = require('./product.router')
var apiResponse = require('../helpers/apiResponse')

var app = express()

app.use('/about/', aboutRoute)
app.use('/blog/', blogRoute)
// app.use('/foodmenu/', foodmenuRoute)
// app.use('/product/', productRoute)

// throw 404 if URL not found
app.all('*', function(req, res) {
  return apiResponse.notFoundResponse(res, 'Page not found')
})
module.exports = app
