const CheckIn = require('../models/checkin.model')
const WorkTime = require('../models/worktime.model')
const User = require('../models/user.model')

const { body, validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator')
var mongoose = require('mongoose')
var dayjs = require('dayjs')
const he = require('he')

var apiResponse = require('../helpers/apiResponse')

var ReadableData = require('stream').Readable
var axios = require('axios')
var FormData = require('form-data')
var fs = require('fs')

// CheckIn Schema
function CheckInData(data) {
  this.id = data._id
  this.userId = data.userId
  this.checkIn = data.checkIn
  this.imageIn = data.imageIn
  this.checkOut = data.checkOut
  this.imageOut = data.imageOut
  this.location = data.location
  this.isLate = data.isLate
  this.statusFlag = data.statusFlag
  this.createdBy = data.createdBy
  this.createdAt = data.createdAt
  this.updatedBy = data.updatedBy
  this.updatedAt = data.updatedAt
}

// WorkTime Schema
function WorkTimeData(data) {
  this.id = data._id
  this.savetime = data.savetime
  this.timeIn = data.timeIn
  this.timeOut = data.timeOut
  this.description = data.description
}

function UserData(data) {
  this.id = data._id
  this.username = data.username
  this.status = data.status
  this.name = data.name
  this.linename = data.linename
  this.image = data.image
  this.team = data.team
  this.workShiftID = data.workShiftID
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

exports.checkinCheck = [
  body('userId', 'userId must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  async (req, res) => {
    const payload = req.body
    try {
      const checkUser = await User.findOne({
        _id: payload.userId
      })
      const userData = new UserData(checkUser)
      if (checkUser === null) {
        return apiResponse.ErrorResponse(res, 'user Id exists with this id')
      }
      const checkin = await CheckIn.findOne({
        userId: userData.id,
        statusFlag: 'A',
        checkOut: null
      })

      if (checkin !== null) {
        let checkinData = new CheckInData(checkin)
        return apiResponse.successResponseWithData(
          res,
          'Operation success',
          checkinData
        )
      } else {
        return apiResponse.notFoundResponse(res, 'Operation success', {})
      }
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
  body('userId', 'userId must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('image', 'image must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('location', 'location must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  async (req, res) => {
    const payload = req.body
    try {
      let checkIn = null
      let checkOut = null
      const timeClock = dayjs()
      const statusFlag = 'A'
      let createdBy = payload.userId
      let updatedBy = payload.userId
      let isLate = null
      let imageIn = null
      let imageOut = null
      let checkin
      // VALIDATION CHECKIN
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array()
        )
      }

      const checkUser = await User.findOne({
        _id: payload.userId
      })
      const userData = new UserData(checkUser)
      if (checkUser === null) {
        return apiResponse.ErrorResponse(res, 'user Id exists with this id')
      }

      const worktime = await WorkTime.findOne({
        _id: mongoose.Types.ObjectId(userData.workShiftID)
      })
      if (worktime === null) {
        return apiResponse.ErrorResponse(
          res,
          'work Shift ID exists with this id'
        )
      }

      const checkinData = await CheckIn.findOne({
        userId: userData.id,
        statusFlag: 'A',
        checkOut: null
      })

      const worktimeData = new WorkTimeData(worktime)
      const getTimeCheckIn = dayjs(
        `${timeClock.format('DD-MM-YYYY')} ${worktimeData.timeIn}`,
        'DD-MM-YYYY HH:mm'
      )
      const setTimeDiff = getTimeCheckIn.diff(timeClock, 'second')

      imageName =
        userData.id + dayjs().format('_YYYY_MM_DD_HH_mm_ss_A') + '.jpg'
      base64 = he.decode(payload.image)
      const imageBufferData = Buffer.from(base64, 'base64')
      var streamObj = new ReadableData()
      streamObj.push(imageBufferData)
      streamObj.push(null)
      streamObj.pipe(fs.createWriteStream(`assets/images/checkin/${imageName}`))

      const message = `ชื่อ: ${userData.name} ไลน์: ${userData.linename} ${
        checkinData === null
          ? `เข้างาน${setTimeDiff > 0 ? 'ตรงเวลา' : 'สาย'}`
          : 'CHECK OUT'
      }`

      try {
        var data = new FormData()
        data.append(
          'imageFile',
          fs.createReadStream(`assets/images/checkin/${imageName}`)
        )
        data.append('message', message)

        var config = {
          method: 'post',
          url: 'https://notify-api.line.me/api/notify',
          headers: {
            Authorization: 'Bearer 6Zwhli6OiuNpDXzpJ3hDvdUZVZ1dLB7gKyK58xn1AVy',
            ...data.getHeaders()
          },
          data: data
        }
        await axios(config)
      } catch (error) {
        return apiResponse.ErrorResponse(res, error)
      }

      if (checkinData === null) {
        imageIn = imageName
        checkIn = timeClock.format()
        isLate = setTimeDiff > 0 ? false : true

        // NEW CHECKIN
        checkin = new CheckIn({
          userId: payload.userId,
          checkIn,
          imageIn,
          checkOut,
          imageOut,
          location: payload.location,
          isLate,
          statusFlag,
          createdBy,
          updatedBy
        })
        await checkin.save()
      } else {
        let getCheckin = new CheckInData(checkinData)
        isLate = getCheckin.isLate
        checkIn = getCheckin.checkIn
        imageIn = getCheckin.imageIn
        imageOut = imageName
        checkOut = timeClock.format()

        // NEW CHECKIN
        checkin = new CheckIn({
          userId: payload.userId,
          checkIn,
          imageIn,
          checkOut,
          imageOut,
          location: payload.location,
          isLate,
          statusFlag,
          createdBy,
          updatedBy,
          _id: getCheckin.id
        })
        const updateCheckIn = await CheckIn.findByIdAndUpdate(
          getCheckin.id,

          {
            $set: checkin
          }
        )

        if (updateCheckIn) {
          let userData = new CheckInData(await CheckIn.findById(getCheckin.id))
          return apiResponse.successResponseWithData(
            res,
            'Check In update Success.',
            userData
          )
        } else {
          return apiResponse.validationErrorWithData(
            res,
            'Invalid Error.',
            'Invalid ID'
          )
        }
      }

      // // SAVE CHECKIN
      let checkinRes = new CheckInData(checkin)
      return apiResponse.successResponseWithData(
        res,
        'CheckIn add Success.',
        checkinRes
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
