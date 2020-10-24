const Image = require('../models/image.model')
const { body, validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator')
var mongoose = require('mongoose')

var apiResponse = require('../helpers/apiResponse')

// Image Schema
function ImageData(data) {
  this.id = data._id
  this.referenceID = data.referenceID
  this.referenceType = data.referenceType
  this.name = data.name
  this.level = data.level
  this.statusFlag = data.statusFlag
  this.createdBy = data.createdBy
  this.createdAt = data.createdAt
  this.updatedBy = data.updatedBy
  this.updatedAt = data.updatedAt
}

exports.imageList = [
  async (req, res) => {
    try {
      const images = await Image.find({})
      return apiResponse.successResponseWithData(
        res,
        'Operation success',
        images
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.imageDetail = [
  async (req, res) => {
    const { id } = req.params

    try {
      const image = await Image.findById(id)

      if (image !== null) {
        let imageData = new ImageData(image)
        return apiResponse.successResponseWithData(
          res,
          'Operation success',
          imageData
        )
      } else {
        return apiResponse.successResponseWithData(res, 'Operation success', {})
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.imageStore = [
  body('referenceID', 'referenceID must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('referenceType', 'referenceType must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('name', 'name must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('level', 'level must not be empty.')
    .isLength({ min: 1, max: 200 })
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
      // VALIDATION IMAGE
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array()
        )
      }

      // NEW IMAGE
      const image = new Image({
        referenceID: payload.referenceID,
        referenceType: payload.referenceType,
        name: payload.name,
        level: payload.level,
        statusFlag: payload.statusFlag,
        createdBy: payload.createdBy,
        updatedBy: payload.updatedBy
      })

      // SAVE IMAGE
      await image.save()
      let imageData = new ImageData(image)
      return apiResponse.successResponseWithData(
        res,
        'Image add Success.',
        imageData
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.imageUpdate = [
  body('referenceID', 'referenceID must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('referenceType', 'referenceType must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('name', 'name must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('level', 'level must not be empty.')
    .isLength({ min: 1, max: 200 })
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
    const { id } = req.params

    try {
      const image = new Image({
        referenceID: payload.referenceID,
        referenceType: payload.referenceType,
        name: payload.name,
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

      const checkImage = await Image.findById(id)
      if (checkImage === null) {
        return apiResponse.notFoundResponse(
          res,
          'Image not exists with this id'
        )
      }

      const updateImage = await Image.findByIdAndUpdate(id, {
        $set: image
      })

      if (updateImage) {
        let imageData = new ImageData(await Image.findById(id))
        return apiResponse.successResponseWithData(
          res,
          'Image update Success.',
          imageData
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

exports.imageDelete = [
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

      const checkImage = await Image.findById(id)
      if (checkImage === null) {
        return apiResponse.notFoundResponse(
          res,
          'Image not exists with this id'
        )
      }

      await Image.findByIdAndDelete(id)

      return apiResponse.successResponse(res, `Image delete Success.`)
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
