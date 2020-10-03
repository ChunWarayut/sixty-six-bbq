const FoodMenu = require('../models/foodmenu.model')
const { body, validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator')
var mongoose = require('mongoose')

var apiResponse = require('../helpers/apiResponse')

// FoodMenu Schema
function FoodMenuData(data) {
  this.id = data._id
  this.type = data.type
  this.nameTH = data.nameTH
  this.nameEN = data.nameEN
  this.image = data.image
  this.price = data.price
  this.scriptTH = data.scriptTH
  this.scriptEN = data.scriptEN
  this.detailTH = data.detailTH
  this.detailEN = data.detailEN
  this.statusFlag = data.statusFlag
  this.createdBy = data.createdBy
  this.createdAt = data.createdAt
  this.updatedBy = data.updatedBy
  this.updatedAt = data.updatedAt
}

exports.foodmenuList = [
  async (req, res) => {
    try {
      const foodmenus = await FoodMenu.find({})
      return apiResponse.successResponseWithData(
        res,
        'Operation success',
        foodmenus
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.foodmenuDetail = [
  async (req, res) => {
    const { id } = req.params

    try {
      const foodmenu = await FoodMenu.findById(id)

      if (foodmenu !== null) {
        let foodmenuData = new FoodMenuData(foodmenu)
        return apiResponse.successResponseWithData(
          res,
          'Operation success',
          foodmenuData
        )
      } else {
        return apiResponse.successResponseWithData(res, 'Operation success', {})
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.foodmenuStore = [
  body('nameTH', 'nameTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('nameEN', 'nameEN must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('image', 'image must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('type', 'type must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('price', 'price must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('scriptTH', 'scriptTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('scriptEN', 'scriptEN must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('detailTH', 'detailTH must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('detailEN', 'detailEN must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('statusFlag', 'statusFlag must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('createdBy', 'createdBy must be 24 length.')
    .isLength({ min: 24, max: 24 })
    .trim(),
  body('updatedBy', 'updatedBy must be 24 length.')
    .isLength({ min: 24, max: 24 })
    .trim(),
  sanitizeBody('*').escape(),
  async (req, res) => {
    const payload = req.body
    try {
      // VALIDATION FOODMENU
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array()
        )
      }

      // NEW FOODMENU
      const foodmenu = new FoodMenu({
        nameTH: payload.nameTH,
        nameEN: payload.nameEN,
        image: payload.image,
        type: payload.type,
        price: payload.price,
        scriptTH: payload.scriptTH,
        scriptEN: payload.scriptEN,
        detailTH: payload.detailTH,
        detailEN: payload.detailEN,
        statusFlag: payload.statusFlag,
        createdBy: payload.createdBy,
        updatedBy: payload.updatedBy
      })

      // SAVE FOODMENU
      await foodmenu.save()
      let foodmenuData = new FoodMenuData(foodmenu)
      return apiResponse.successResponseWithData(
        res,
        'FoodMenu add Success.',
        foodmenuData
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.foodmenuUpdate = [
  body('nameTH', 'nameTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('nameEN', 'nameEN must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('image', 'image must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('type', 'type must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('price', 'price must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('scriptTH', 'scriptTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('scriptEN', 'scriptEN must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('detailTH', 'detailTH must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('detailEN', 'detailEN must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('statusFlag', 'statusFlag must be 1 length.')
    .isLength({ min: 1, max: 1 })
    .trim(),
  body('createdBy', 'createdBy must be 24 length.')
    .isLength({ min: 24, max: 24 })
    .trim(),
  body('updatedBy', 'updatedBy must be 24 length.')
    .isLength({ min: 24, max: 24 })
    .trim(),
  sanitizeBody('*').escape(),
  async (req, res) => {
    const payload = req.body
    const { id } = req.params

    try {
      const foodmenu = new FoodMenu({
        nameTH: payload.nameTH,
        nameEN: payload.nameEN,
        image: payload.image,
        type: payload.type,
        price: payload.price,
        scriptTH: payload.scriptTH,
        scriptEN: payload.scriptEN,
        detailTH: payload.detailTH,
        detailEN: payload.detailEN,
        statusFlag: payload.statusFlag,
        createdBy: payload.createdBy,
        updatedBy: payload.updatedBy,
        _id: id
      })

      if (!mongoose.Types.ObjectId.isValid(id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        )
      }

      const checkFoodMenu = await FoodMenu.findById(id)
      if (checkFoodMenu === null) {
        return apiResponse.notFoundResponse(
          res,
          'FoodMenu not exists with this id'
        )
      }

      const updateFoodMenu = await FoodMenu.findByIdAndUpdate(id, {
        $set: foodmenu
      })

      if (updateFoodMenu) {
        let foodmenuData = new FoodMenuData(await FoodMenu.findById(id))
        return apiResponse.successResponseWithData(
          res,
          'FoodMenu update Success.',
          foodmenuData
        )
      } else {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        )
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]

exports.foodmenuDelete = [
  async (req, res) => {
    const { id } = req.params

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return apiResponse.validationErrorWithData(
          res,
          'Invalid Error.',
          'Invalid ID'
        )
      }

      const checkFoodMenu = await FoodMenu.findById(id)
      if (checkFoodMenu === null) {
        return apiResponse.notFoundResponse(
          res,
          'FoodMenu not exists with this id'
        )
      }

      await FoodMenu.findByIdAndDelete(id)

      return apiResponse.successResponse(res, `FoodMenu delete Success.`)
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
