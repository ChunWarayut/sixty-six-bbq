const WorkTime = require('../models/worktime.model')
const { body, validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator')
var mongoose = require('mongoose')

var apiResponse = require('../helpers/apiResponse')

// WorkTime Schema
function WorkTimeData(data) {
  this.id = data._id
  this.timeIn = data.timeIn
  this.timeOut = data.timeOut
  this.description = data.description
  this.statusFlag = data.statusFlag
  this.createdBy = data.createdBy
  this.createdAt = data.createdAt
  this.updatedBy = data.updatedBy
  this.updatedAt = data.updatedAt
}

exports.worktimeList = [
  async (req, res) => {
    try {
      const worktimes = await WorkTime.find({})
      return apiResponse.successResponseWithData(
        res,
        'Operation success',
        worktimes
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.worktimeDetail = [
  async (req, res) => {
    const { id } = req.params

    try {
      const worktime = await WorkTime.findById(id)

      if (worktime !== null) {
        let worktimeData = new WorkTimeData(worktime)
        return apiResponse.successResponseWithData(
          res,
          'Operation success',
          worktimeData
        )
      } else {
        return apiResponse.successResponseWithData(res, 'Operation success', {})
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.worktimeStore = [
  body('timeIn', 'timeIn must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('timeOut', 'timeOut must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('description', 'description must not be empty.')
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
      // VALIDATION WORKTIME
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array()
        )
      }

      // NEW WORKTIME
      const worktime = new WorkTime({
        timeIn: payload.timeIn,
        timeOut: payload.timeOut,
        description: payload.description,
        statusFlag: payload.statusFlag,
        createdBy: payload.createdBy,
        updatedBy: payload.updatedBy
      })

      // SAVE WORKTIME
      await worktime.save()
      let worktimeData = new WorkTimeData(worktime)
      return apiResponse.successResponseWithData(
        res,
        'WorkTime add Success.',
        worktimeData
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.worktimeUpdate = [
  body('timeIn', 'timeIn must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('timeOut', 'timeOut must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('description', 'description must not be empty.')
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
      const worktime = new WorkTime({
        timeIn: payload.timeIn,
        timeOut: payload.timeOut,
        description: payload.description,
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

      const checkWorkTime = await WorkTime.findById(id)
      if (checkWorkTime === null) {
        return apiResponse.notFoundResponse(
          res,
          'WorkTime not exists with this id'
        )
      }

      const updateWorkTime = await WorkTime.findByIdAndUpdate(id, {
        $set: worktime
      })

      if (updateWorkTime) {
        let worktimeData = new WorkTimeData(await WorkTime.findById(id))
        return apiResponse.successResponseWithData(
          res,
          'WorkTime update Success.',
          worktimeData
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

exports.worktimeDelete = [
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

      const checkWorkTime = await WorkTime.findById(id)
      if (checkWorkTime === null) {
        return apiResponse.notFoundResponse(
          res,
          'WorkTime not exists with this id'
        )
      }

      await WorkTime.findByIdAndDelete(id)

      return apiResponse.successResponse(res, `WorkTime delete Success.`)
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
