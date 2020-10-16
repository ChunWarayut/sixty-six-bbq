const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema(
  {
    titleTH: String,
    titleEN: String,
    scriptTH: String,
    scriptEN: String,
    detailTH: String,
    detailEN: String,
    statusFlag: String,
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true, versionKey: false }
)

const BlogModel = mongoose.model('Blog', blogSchema)

module.exports = BlogModel
