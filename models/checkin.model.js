const mongoose = require('mongoose')
const Schema = mongoose.Schema

const checkinSchema = new Schema(
  {
    workTime: String,
    userId: String,
    checkIn: String,
    imageIn: String,
    checkOut: String,
    imageOut: String,
    location: String,
    statusFlag: String,
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true, versionKey: false }
)

const CheckInModel = mongoose.model('CheckIn', checkinSchema)

module.exports = CheckInModel
