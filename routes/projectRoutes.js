const express = require('express');
const { createProjectHandler, getProjectsHandler } = require('../controllers/projectController')

const router = express.Router();

router.post('/',createProjectHandler)
router.get('/', getProjectsHandler)

module.exports = router;