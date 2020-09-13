const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema(
  {
    referenceID: String,
    referenceType: String,
    name: String,
    level: Number,
    statusFlag: String,
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true, versionKey: false }
)

const ImageModel = mongoose.model('Image', imageSchema)

module.exports = ImageModel
