const express = require('express')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const professor = require('../models/professor.model.js')
const {createProfessor, getProfessor, getallProfessors, uploadpicProfessor, updateProfessor} = require('../controllers/professor.controller.js')
const professorRouter= express.Router()

const verifyToken = require('../middlewares/auth.middleware.js')
const {profReqVerify} = require('../middlewares/req.middleware.js')
const upload = require('../middlewares/upload.js')
const app = express()


professorRouter.post('/add', createProfessor)
professorRouter.get('/get/:id',verifyToken,getProfessor)
professorRouter.get('/get/w/allprofessors',verifyToken,getallProfessors)
professorRouter.post('/pic/upload', upload, uploadpicProfessor)
professorRouter.post('/update', profReqVerify , updateProfessor)

module.exports = professorRouter;