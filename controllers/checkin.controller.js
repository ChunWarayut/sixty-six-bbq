const CheckIn = require('../models/checkin.model')
const { body, validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator')
var mongoose = require('mongoose')

var apiResponse = require('../helpers/apiResponse')

// CheckIn Schema
function CheckInData(data) {
  this.id = data._id
  this.workTime = data.workTime
  this.userId = data.userId
  this.checkIn = data.checkIn
  this.imageIn = data.imageIn
  this.checkOut = data.checkOut
  this.imageOut = data.imageOut
  this.location = data.location
  this.statusFlag = data.statusFlag
  this.createdBy = data.createdBy
  this.createdAt = data.createdAt
  this.updatedBy = data.updatedBy
  this.updatedAt = data.updatedAt
}

exports.checkinList = [
  async (req, res) => {
    try {
      const checkins = await CheckIn.find({})
      return apiResponse.successResponseWithData(
        res,
        'Operation success',
        checkins
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.checkinDetail = [
  async (req, res) => {
    const { id } = req.params

    try {
      const checkin = await CheckIn.findById(id)

      if (checkin !== null) {
        let checkinData = new CheckInData(checkin)
        return apiResponse.successResponseWithData(
          res,
          'Operation success',
          checkinData
        )
      } else {
        return apiResponse.successResponseWithData(res, 'Operation success', {})
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.checkinStore = [
  body('workTime', 'workTime must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('userId', 'userId must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('checkIn', 'checkIn must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('imageIn', 'imageIn must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('checkOut', 'checkOut must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('imageOut', 'imageOut must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('location', 'location must not be empty.')
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
      // VALIDATION CHECKIN
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array()
        )
      }

      // NEW CHECKIN
      const checkin = new CheckIn({
        workTime: payload.workTime,
        userId: payload.userId,
        checkIn: payload.checkIn,
        imageIn: payload.imageIn,
        checkOut: payload.checkOut,
        imageOut: payload.imageOut,
        location: payload.location,
        statusFlag: payload.statusFlag,
        createdBy: payload.createdBy,
        updatedBy: payload.updatedBy
      })

      // SAVE CHECKIN
      await checkin.save()
      let checkinData = new CheckInData(checkin)
      return apiResponse.successResponseWithData(
        res,
        'CheckIn add Success.',
        checkinData
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.checkinUpdate = [
  body('workTime', 'workTime must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('userId', 'userId must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('checkIn', 'checkIn must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('imageIn', 'imageIn must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('checkOut', 'checkOut must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('imageOut', 'imageOut must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('location', 'location must not be empty.')
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
      const checkin = new CheckIn({
        workTime: payload.workTime,
        userId: payload.userId,
        checkIn: payload.checkIn,
        imageIn: payload.imageIn,
        checkOut: payload.checkOut,
        imageOut: payload.imageOut,
        location: payload.location,
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

      const checkCheckIn = await CheckIn.findById(id)
      if (checkCheckIn === null) {
        return apiResponse.notFoundResponse(
          res,
          'CheckIn not exists with this id'
        )
      }

      const updateCheckIn = await CheckIn.findByIdAndUpdate(id, {
        $set: checkin
      })

      if (updateCheckIn) {
        let checkinData = new CheckInData(await CheckIn.findById(id))
        return apiResponse.successResponseWithData(
          res,
          'CheckIn update Success.',
          checkinData
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

exports.checkinDelete = [
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

      const checkCheckIn = await CheckIn.findById(id)
      if (checkCheckIn === null) {
        return apiResponse.notFoundResponse(
          res,
          'CheckIn not exists with this id'
        )
      }

      await CheckIn.findByIdAndDelete(id)

      return apiResponse.successResponse(res, `CheckIn delete Success.`)
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
