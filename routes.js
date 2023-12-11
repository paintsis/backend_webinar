const express = require('express');
const router = express.Router();
const encuesta = require('./todo/todo.router')
router.use('/api', encuesta)

module.exports = router;