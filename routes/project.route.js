const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const project = require('../models/project.model.js')
const {createProject, getProject, getallProjects} = require('../controllers/project.controller.js')
const projectRouter= express.Router();
const verifyToken = require('../middlewares/auth.middleware.js')

const app = express()

// post projects
projectRouter.post('/add', verifyToken,createProject)
projectRouter.get('/get/:id',verifyToken,getProject)
projectRouter.get('/get/w/allprojects',verifyToken,getallProjects)

module.exports = projectRouter;