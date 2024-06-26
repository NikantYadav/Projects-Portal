const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const student = require('../models/student.model.js')
const {createStudent, getStudent, getallStudents} = require('../controllers/student.controller.js')
const studentRouter= express.Router();
const verifyToken = require('../middlewares/auth.middleware.js')

const app = express()

// post students
studentRouter.post('/add', createStudent)
studentRouter.get('/get/:id',verifyToken,getStudent)
studentRouter.get('/get/w/allstudents',verifyToken, getallStudents)

module.exports = studentRouter;
