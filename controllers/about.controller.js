const About = require('../models/about.model')
const { body, validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator')
var mongoose = require('mongoose')

var apiResponse = require('../helpers/apiResponse')

// About Schema
function AboutData(data) {
  this.id = data._id
  this.titleTH = data.titleTH
  this.titleEN = data.titleEN
  this.scriptTH = data.scriptTH
  this.scriptEN = data.scriptEN
  this.detailTH = data.detailTH
  this.detailEN = data.detailEN
  this.statusFlag = data.statusFlag
  this.createdBy = data.createdBy
  this.createdAt = data.createdAt
  this.updatedBy = data.updatedBy
  this.updatedAt = data.updatedAt
}

exports.aboutList = [
  async (req, res) => {
    try {
      const abouts = await About.find({})
      return apiResponse.successResponseWithData(
        res,
        'Operation success',
        abouts
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.aboutDetail = [
  async (req, res) => {
    const { id } = req.params

    try {
      const about = await About.findById(id)

      if (about !== null) {
        let aboutData = new AboutData(about)
        return apiResponse.successResponseWithData(
          res,
          'Operation success',
          aboutData
        )
      } else {
        return apiResponse.successResponseWithData(res, 'Operation success', {})
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.aboutStore = [
  body('titleTH', 'titleTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('titleEN', 'titleEN must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('scriptTH', 'scriptTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('scriptEN', 'scriptEN must not be empty.')
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
      // VALIDATION ABOUT
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array()
        )
      }

      // NEW ABOUT
      const about = new About({
        titleTH: payload.titleTH,
        titleEN: payload.titleEN,
        scriptTH: payload.scriptTH,
        scriptEN: payload.scriptEN,
        detailTH: payload.detailTH,
        detailEN: payload.detailEN,
        statusFlag: payload.statusFlag,
        createdBy: payload.createdBy,
        updatedBy: payload.updatedBy
      })

      // SAVE ABOUT
      await about.save()
      let aboutData = new AboutData(about)
      return apiResponse.successResponseWithData(
        res,
        'About add Success.',
        aboutData
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.aboutUpdate = [
  body('titleTH', 'titleTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('titleEN', 'titleEN must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('scriptTH', 'scriptTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('scriptEN', 'scriptEN must not be empty.')
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
    const { id } = req.params

    try {
      const about = new About({
        titleTH: payload.titleTH,
        titleEN: payload.titleEN,
        scriptTH: payload.scriptTH,
        scriptEN: payload.scriptEN,
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

      const checkAbout = await About.findById(id)
      if (checkAbout === null) {
        return apiResponse.notFoundResponse(
          res,
          'About not exists with this id'
        )
      }

      const updateAbout = await About.findByIdAndUpdate(id, {
        $set: about
      })

      if (updateAbout) {
        let aboutData = new AboutData(await About.findById(id))
        return apiResponse.successResponseWithData(
          res,
          'About update Success.',
          aboutData
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

exports.aboutDelete = [
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

      const checkAbout = await About.findById(id)
      if (checkAbout === null) {
        return apiResponse.notFoundResponse(
          res,
          'About not exists with this id'
        )
      }

      await About.findByIdAndDelete(id)

      return apiResponse.successResponse(res, `About delete Success.`)
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
