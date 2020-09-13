const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema(
  {
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
    latitude: String,
    longitude: String,
    statusFlag: String,
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true, versionKey: false }
)

const ContactModel = mongoose.model('Contact', contactSchema)

module.exports = ContactModel
