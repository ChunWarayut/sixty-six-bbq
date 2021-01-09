const mongoose = require('mongoose')
const Schema = mongoose.Schema

const worktimeSchema = new Schema(
  {
    timeIn: String,
    timeOut: String,
    description: String,
    statusFlag: String,
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true, versionKey: false }
)

const WorkTimeModel = mongoose.model('WorkTime', worktimeSchema)

module.exports = WorkTimeModel
