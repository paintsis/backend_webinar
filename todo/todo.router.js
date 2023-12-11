const express = require('express');
//const { object } = require('joi');
const router = express.Router();
const controller = require('./todo.controller')
const validator = require('./todo.validations')
//const Joi = require('joi');


router.get('/', controller.getAll);
router.post('/',  controller.create)
router.get('/:id', controller.findOne)
router.put('/:id', controller.update)
module.exports = router;

