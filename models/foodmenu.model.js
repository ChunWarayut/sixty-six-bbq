const mongoose = require('mongoose')
const Schema = mongoose.Schema

const foodMenuSchema = new Schema(
  {
    titleID: String,
    typeID: String,
    nameTH: String,
    nameTH: String,
    detailTH: String,
    detailEN: String,
    price: Number,
    slide: Boolean,
    statusFlag: String,
    createdBy: String,
    updatedBy: String
  },
  { timestamps: true, versionKey: false }
)

const FoodMenuModel = mongoose.model('FoodMenu', foodMenuSchema)

module.exports = FoodMenuModel
