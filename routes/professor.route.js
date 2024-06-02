const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const professor = require('../models/professor.model.js')
const {createProfessor, getProfessor, getallProfessors} = require('../controllers/professor.controller.js')
const professorRouter= express.Router();

const verifyToken = require('../middlewares/auth.middleware.js')

const app = express()

// post professors
professorRouter.post('/add', createProfessor)
professorRouter.get('/get/:id',verifyToken,getProfessor)
professorRouter.get('/get/w/allprofessors',verifyToken,getallProfessors)

module.exports = professorRouter;