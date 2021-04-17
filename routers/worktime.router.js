const express = require('express')
const worktimeController = require('../controllers/worktime.controller')

var router = express.Router()

router.get('/', worktimeController.worktimeList)
router.get('/:id', worktimeController.worktimeDetail)
router.post('/', worktimeController.worktimeStore)
router.put('/:id', worktimeController.worktimeUpdate)
router.delete('/:id', worktimeController.worktimeDelete)

module.exports = router
