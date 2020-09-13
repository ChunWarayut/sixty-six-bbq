const Blog = require('../models/blog.model')
const { body, validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator')
var mongoose = require('mongoose')

var apiResponse = require('../helpers/apiResponse')

// Blog Schema
function BlogData(data) {
  this.id = data._id
  this.titleTH = data.titleTH
  this.titleEN = data.titleEN
  this.detailTH = data.detailTH
  this.detailEN = data.detailEN
  this.statusFlag = data.statusFlag
  this.createdBy = data.createdBy
  this.createdAt = data.createdAt
  this.updatedBy = data.updatedBy
  this.updatedAt = data.updatedAt
}

exports.blogList = [
  async (req, res) => {
    try {
      const blogs = await Blog.find({})
      return apiResponse.successResponseWithData(
        res,
        'Operation success',
        blogs
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.blogDetail = [
  async (req, res) => {
    const { id } = req.params

    try {
      const blog = await Blog.findById(id)

      if (blog !== null) {
        let blogData = new BlogData(blog)
        return apiResponse.successResponseWithData(
          res,
          'Operation success',
          blogData
        )
      } else {
        return apiResponse.successResponseWithData(res, 'Operation success', {})
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.blogStore = [
  body('titleTH', 'titleTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('titleEN', 'titleEN must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('detailTH', 'detailTH must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('detailEN', 'detailEN must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('statusFlag', 'statusFlag must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('createdBy', 'createdBy must be 24 length.')
    .isLength({ min: 24, max: 24 })
    .trim(),
  body('updatedBy', 'updatedBy must be 24 length.')
    .isLength({ min: 24, max: 24 })
    .trim(),
  sanitizeBody('*').escape(),
  async (req, res) => {
    const payload = req.body
    try {
      // VALIDATION BLOG
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array()
        )
      }

      // NEW BLOG
      const blog = new Blog({
        titleTH: payload.titleTH,
        titleEN: payload.titleEN,
        detailTH: payload.detailTH,
        detailEN: payload.detailEN,
        statusFlag: payload.statusFlag,
        createdBy: payload.createdBy,
        updatedBy: payload.updatedBy
      })

      // SAVE BLOG
      await blog.save()
      let blogData = new BlogData(blog)
      return apiResponse.successResponseWithData(
        res,
        'Blog add Success.',
        blogData
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.blogUpdate = [
  body('titleTH', 'titleTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('titleEN', 'titleEN must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('detailTH', 'detailTH must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('detailEN', 'detailEN must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('statusFlag', 'statusFlag must be 1 length.')
    .isLength(1)
    .trim(),
  body('createdBy', 'createdBy must be 24 length.')
    .isLength(24)
    .trim(),
  body('updatedBy', 'updatedBy must be 24 length.')
    .isLength(24)
    .trim(),
  sanitizeBody('*').escape(),
  async (req, res) => {
    const payload = req.body
    const { id } = req.params

    try {
      const blog = new Blog({
        titleTH: payload.titleTH,
        titleEN: payload.titleEN,
        detailTH: payload.detailTH,
        detailEN: payload.detailEN,
        statusFlag: payload.statusFlag,
        createdBy: payload.createdBy,
        updatedBy: payload.updatedBy,
        _id: id
      })

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        )
      }

      const checkBlog = await Blog.findById(id)
      if (checkBlog === null) {
        return apiResponse.notFoundResponse(res, 'Blog not exists with this id')
      }

      const updateBlog = await Blog.findByIdAndUpdate(id, {
        $set: blog
      })

      if (updateBlog) {
        let blogData = new BlogData(await Blog.findById(id))
        return apiResponse.successResponseWithData(
          res,
          'Blog update Success.',
          blogData
        )
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

exports.blogDelete = [
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

      const checkBlog = await Blog.findById(id)
      if (checkBlog === null) {
        return apiResponse.notFoundResponse(res, 'Blog not exists with this id')
      }

      await Blog.findByIdAndDelete(id)

      return apiResponse.successResponse(res, `Blog delete Success.`)
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
