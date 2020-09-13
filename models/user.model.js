const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    username: String,
    password: Number,
    status: String,
    firstname: String,
    lastname: String,
    addressTH: String,
    addressEN: String,
    villageTH: String,
    villageTH: String,
    alleyTH: String,
    alleyEN: String,
    roadTH: String,
    roadEN: String,
    subdistrictTH: String,
    subdistrictEN: String,
    districtTH: String,
    districtEN: String,
    provinceTH: String,
    provinceEN: String,
    post: String,
    email: String,
    tel: String,
    statusFlag: String,
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true, versionKey: false }
)

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel
