const express = require('express');
const { createStudentHandler, getStudentsHandler } = require('../controllers/studentController')

const router = express.Router();

router.post('/',createStudentHandler)
router.get('/', getStudentsHandler)

module.exports = router;