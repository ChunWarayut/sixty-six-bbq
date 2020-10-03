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
  this.firstname = data.firstname
  this.lastname = data.lastname
  this.adress_th = data.lastname
  this.adress_en = data.lastname
  this.road_th = data.lastname
  this.road_en = data.lastname
  this.subdistrict_th = data.lastname
  this.subdistrict_en = data.lastname
  this.district_th = data.lastname
  this.district_en = data.lastname
  this.province_th = data.lastname
  this.province_en = data.province_en
  this.post = data.lastname
  this.email = data.email
  this.tel = data.tel
  this.status = data.status
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
  body('firstname', 'firstname must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('lastname', 'lastname must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('adress_th', 'adress_th must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('adress_en', 'adress_en must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('road_th', 'road_th must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('road_en', 'road_en must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('subdistrict_th', 'subdistrict_th must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('subdistrict_en', 'subdistrict_en must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('district_th', 'district_th must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('district_en', 'district_en must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('province_th', 'province_th must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('province_en', 'province_en must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('post', 'post must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('email', 'email must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('tel', 'tel must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('status', 'status must be 1 length.')
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
        firstname: payload.firstname,
        lastname: payload.lastname,
        adress_th: payload.adress_th,
        adress_en: payload.adress_en,
        road_th: payload.road_th,
        road_en: payload.road_en,
        subdistrict_th: payload.subdistrict_th,
        subdistrict_en: payload.subdistrict_en,
        district_th: payload.district_th,
        district_en: payload.district_en,
        province_th: payload.province_th,
        province_en: payload.province_en,
        email: payload.email,
        tel: payload.tel,
        status: payload.status,
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
  body('firstname', 'firstname must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('lastname', 'lastname must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('adress_th', 'adress_th must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('adress_en', 'adress_en must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('road_th', 'road_th must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('road_en', 'road_en must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('subdistrict_th', 'subdistrict_th must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('subdistrict_en', 'subdistrict_en must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('district_th', 'district_th must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('district_en', 'district_en must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('province_th', 'province_th must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('province_en', 'province_en must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('post', 'post must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('email', 'email must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('tel', 'tel must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('status', 'status must be 1 length.')
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
        firstname: payload.firstname,
        lastname: payload.lastname,
        adress_th: payload.adress_th,
        adress_en: payload.adress_en,
        road_th: payload.road_th,
        road_en: payload.road_en,
        subdistrict_th: payload.subdistrict_th,
        subdistrict_en: payload.subdistrict_en,
        district_th: payload.district_th,
        district_en: payload.district_en,
        province_th: payload.province_th,
        province_en: payload.province_en,
        email: payload.email,
        tel: payload.tel,
        status: payload.status,
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
        return apiResponse.notFoundResponse(res, 'User not exists with this id')
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
        return apiResponse.notFoundResponse(res, 'User not exists with this id')
      }

      await User.findByIdAndDelete(id)

      return apiResponse.successResponse(res, `User delete Success.`)
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
