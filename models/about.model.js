const mongoose = require('mongoose')
const Schema = mongoose.Schema

const aboutSchema = new Schema(
  {
    titleTH: String,
    titleEN: String,
    detailTH: String,
    detailEN: String,
    statusFlag: String,
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true, versionKey: false }
)

const AboutModel = mongoose.model('About', aboutSchema)

module.exports = AboutModel
