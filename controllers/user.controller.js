const User = require('../models/user.model')
const { body, validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator')
var mongoose = require('mongoose')

var apiResponse = require('../helpers/apiResponse')

// User Schema
function UserData(data) {
  this.id = data._id
  this.username = data.username
  this.password = data.password
  this.status = data.status
  this.name = data.name
  this.linename = data.linename
  this.image = data.image
  this.team = data.team
  this.statusFlag = data.statusFlag
  this.createdBy = data.createdBy
  this.createdAt = data.createdAt
  this.updatedBy = data.updatedBy
  this.updatedAt = data.updatedAt
}

exports.userList = [
  async (req, res) => {
    try {
      const users = await User.find({})
      return apiResponse.successResponseWithData(
        res,
        'Operation success',
        users
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.userDetail = [
  async (req, res) => {
    const { id } = req.params

    try {
      const user = await User.findById(id)

      if (user !== null) {
        let userData = new UserData(user)
        return apiResponse.successResponseWithData(
          res,
          'Operation success',
          userData
        )
      } else {
        return apiResponse.successResponseWithData(res, 'Operation success', {})
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.userStore = [
  body('username', 'username must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('password', 'password must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('status', 'status must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('name', 'name must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('linename', 'linename must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('team', 'team must not be empty.')
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
      // VALIDATION USER
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array()
        )
      }

      // NEW USER
      const user = new User({
        username: payload.username,
        password: payload.password,
        status: payload.status,
        name: payload.name,
        linename: payload.linename,
        image: payload.image,
        team: payload.team,
        statusFlag: payload.statusFlag,
        createdBy: payload.createdBy,
        updatedBy: payload.updatedBy
      })

      // SAVE USER
      await user.save()
      let userData = new UserData(user)
      return apiResponse.successResponseWithData(
        res,
        'User add Success.',
        userData
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.userUpdate = [
  body('username', 'username must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('password', 'password must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('status', 'status must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('name', 'name must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('linename', 'linename must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('image', 'image must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('team', 'team must not be empty.')
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
      const user = new User({
        username: payload.username,
        password: payload.password,
        status: payload.status,
        name: payload.name,
        linename: payload.linename,
        image: payload.image,
        team: payload.team,
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

      const checkUser = await User.findById(id)
      if (checkUser === null) {
        return apiResponse.notFoundResponse(
          res,
          'User not exists with this id'
        )
      }

      const updateUser = await User.findByIdAndUpdate(id, {
        $set: user
      })

      if (updateUser) {
        let userData = new UserData(await User.findById(id))
        return apiResponse.successResponseWithData(
          res,
          'User update Success.',
          userData
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

exports.userDelete = [
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

      const checkUser = await User.findById(id)
      if (checkUser === null) {
        return apiResponse.notFoundResponse(
          res,
          'User not exists with this id'
        )
      }

      await User.findByIdAndDelete(id)

      return apiResponse.successResponse(res, `User delete Success.`)
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
