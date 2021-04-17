const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: String,
    password: String,
    status: String,
    name: String,
    linename: String,
    image: String,
    workShiftID: String,
    statusFlag: String,
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true, versionKey: false }
)

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
