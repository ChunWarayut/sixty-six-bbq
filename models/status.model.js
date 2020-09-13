const mongoose = require('mongoose')
const Schema = mongoose.Schema

const statusSchema = new Schema(
  {
    name: String,
    level: Number,
    statusFlag: String,
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true, versionKey: false }
)

const StatusModel = mongoose.model('Status', statusSchema)

module.exports = StatusModel
