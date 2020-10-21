const Contact = require('../models/contact.model')
const { body, validationResult } = require('express-validator')
const { sanitizeBody } = require('express-validator')
var mongoose = require('mongoose')

var apiResponse = require('../helpers/apiResponse')

// Contact Schema
function ContactData(data) {
  this.adressTH = data.adressTH
  this.adressEN = data.adressEN
  this.roadTH = data.roadTH
  this.roadEN = data.roadEN
  this.subdistrictTH = data.subdistrictTH
  this.subdistrictEN = data.subdistrictEN
  this.districtTH = data.districtTH
  this.districtEN = data.districtEN
  this.provinceTH = data.provinceTH
  this.provinceEN = data.provinceEN
  this.post = data.post
  this.email = data.email
  this.tel = data.tel
  this.statusFlag = data.statusFlag
  this.createdBy = data.createdBy
  this.createdAt = data.createdAt
  this.updatedBy = data.updatedBy
  this.updatedAt = data.updatedAt
}

exports.contactList = [
  async (req, res) => {
    try {
      const contacts = await Contact.find({})
      return apiResponse.successResponseWithData(
        res,
        'Operation success',
        contacts
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.contactDetail = [
  async (req, res) => {
    const { id } = req.params

    try {
      const contact = await Contact.findById(id)

      if (contact !== null) {
        let contactData = new ContactData(contact)
        return apiResponse.successResponseWithData(
          res,
          'Operation success',
          contactData
        )
      } else {
        return apiResponse.successResponseWithData(res, 'Operation success', {})
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.contactStore = [
  body('adressTH', 'adressTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('adressEN', 'adressEN must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('roadTH', 'roadTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('roadEN', 'roadEN must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('subdistrictTH', 'subdistrictTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('subdistrictEN', 'subdistrictEN must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('districtTH', 'districtTH must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('districtEN', 'districtEN must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('provinceTH', 'provinceTH must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('provinceEN', 'provinceEN must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('post', 'post must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('email', 'email must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('tel', 'tel must not be empty.')
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
      // VALIDATION CONTACT
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array()
        )
      }

      // NEW CONTACT
      const contact = new Contact({
        adressTH: payload.titleTH,
        adressEN: payload.titleEN,
        roadTH: payload.scriptTH,
        roadEN: payload.scriptEN,
        subdistrictTH: payload.detailTH,
        subdistrictEN: payload.detailEN,
        districtTH: payload.districtTH,
        districtEN: payload.districtEN,
        provinceTH: payload.provinceTH,
        provinceEN: payload.provinceEN,
        post: payload.post,
        email: payload.email,
        tel: payload.tel,
        statusFlag: payload.statusFlag,
        createdBy: payload.createdBy,
        updatedBy: payload.updatedBy
      })

      // SAVE CONTACT
      await contact.save()
      let contactData = new ContactData(contact)
      return apiResponse.successResponseWithData(
        res,
        'Contact add Success.',
        contactData
      )
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
exports.contactUpdate = [
  body('adressTH', 'adressTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('adressEN', 'adressEN must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('roadTH', 'roadTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('roadEN', 'roadEN must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('subdistrictTH', 'subdistrictTH must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('subdistrictEN', 'subdistrictEN must not be empty.')
    .isLength({ min: 1, max: 200 })
    .trim(),
  body('districtTH', 'districtTH must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('districtEN', 'districtEN must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('provinceTH', 'provinceTH must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('provinceEN', 'provinceEN must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('post', 'post must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('email', 'email must not be empty.')
    .isLength({ min: 1 })
    .trim(),
  body('tel', 'tel must not be empty.')
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
      const contact = new Contact({
        adressTH: payload.titleTH,
        adressEN: payload.titleEN,
        roadTH: payload.scriptTH,
        roadEN: payload.scriptEN,
        subdistrictTH: payload.detailTH,
        subdistrictEN: payload.detailEN,
        districtTH: payload.districtTH,
        districtEN: payload.districtEN,
        provinceTH: payload.provinceTH,
        provinceEN: payload.provinceEN,
        post: payload.post,
        email: payload.email,
        tel: payload.tel,
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

      const checkContact = await Contact.findById(id)
      if (checkContact === null) {
        return apiResponse.notFoundResponse(
          res,
          'Contact not exists with this id'
        )
      }

      const updateContact = await Contact.findByIdAndUpdate(id, {
        $set: contact
      })

      if (updateContact) {
        let contactData = new ContactData(await Contact.findById(id))
        return apiResponse.successResponseWithData(
          res,
          'Contact update Success.',
          contactData
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

exports.contactDelete = [
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

      const checkContact = await Contact.findById(id)
      if (checkContact === null) {
        return apiResponse.notFoundResponse(
          res,
          'Contact not exists with this id'
        )
      }

      await Contact.findByIdAndDelete(id)

      return apiResponse.successResponse(res, `Contact delete Success.`)
    } catch (error) {
      return apiResponse.ErrorResponse(res, error)
    }
  }
]
