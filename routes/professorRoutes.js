const express = require('express');
const { createProfessorHandler, getProfessorsHandler } = require('../controllers/professorController')

const router = express.Router();

router.post('/',createProfessorHandler)
router.get('/', getProfessorsHandler)

module.exports = router;