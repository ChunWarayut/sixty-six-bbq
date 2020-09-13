const Product = require('../models/product.model')
const { body, validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator')
var mongoose = require('mongoose')

var apiResponse = require('../helpers/apiResponse')

// Product Schema
function ProductData(data) {
  this.id = data._id
  this.name = data.name
  this.category = data.category
  this.price = data.price
  this.tags = data.tags
  this.createdAt = data.createdAt
}

exports.productList = [
  async (req, res) => {
    try {
      const products = await Product.find({})
      return apiResponse.successResponse(res, products)
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.productDetail = [
  async (req, res) => {
    const { id } = req.params

    try {
      const product = await Product.findById(id)
      console.log(product)
      if (product) {
        return apiResponse.successResponse(res, product)
      } else {
        return apiResponse.ErrorResponse(res, 'id not found!')
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.productStore = [
  body('name', 'name must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('category', 'category must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('price', 'price must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('price', 'price must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('price', 'price must be number.')
    .isFloat()
    .trim(),
  sanitizeBody('*').escape(),
  async (req, res) => {
    const payload = req.body
    try {
      // VALIDATION PRODUCT
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array()
        )
      }

      // NEW PRODUCT
      const product = new Product({
        name: payload.name,
        category: payload.category,
        price: payload.price,
        tags: payload.tags
      })

      // SAVE PRODUCT
      await product.save()
      return apiResponse.successResponseWithData(res, product)
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.productUpdate = [
  body('name', 'name must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('category', 'category must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('price', 'price must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('price', 'price must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('price', 'price must be number.')
    .isFloat()
    .trim(),
  sanitizeBody('*').escape(),
  async (req, res) => {
    const payload = req.body
    const { id } = req.params

    try {
      const product = new Product({
        name: payload.name,
        category: payload.category,
        price: payload.price,
        tags: payload.tags,
        _id: id
      })

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        )
      }

      const checkProduct = await Product.findById(id)
      if (checkProduct === null) {
        return apiResponse.notFoundResponse(
          res,
          'Product not exists with this id'
        )
      }

      const updateProduct = await Product.findByIdAndUpdate(id, {
        $set: product
      })

      if (updateProduct) {
        return apiResponse.successResponse(res, `Product update Success.`)
      } else {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        )
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]

exports.productDelete = [
  async (req, res) => {
    const { id } = req.params

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        )
      }

      const checkProduct = await Product.findById(id)
      if (checkProduct === null) {
        return apiResponse.notFoundResponse(
          res,
          'Product not exists with this id'
        )
      }

      await Product.findByIdAndDelete(id)

      return apiResponse.successResponse(res, `Product delete Success.`)
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
