const mongoose = require('mongoose')
const Schema = mongoose.Schema

const referenceValueSchema = new Schema(
  {
    titleTH: String,
    titleEN: String,
    code: String,
    statusFlag: String,
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true, versionKey: false }
)

const ReferenceValueModel = mongoose.model(
  'ReferenceValue',
  referenceValueSchema
)

module.exports = ReferenceValueModel
