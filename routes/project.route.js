const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const project = require('../models/project.model.js')
const {createProject, getProject, getallProjects} = require('../controllers/project.controller.js')
const projectRouter= express.Router();

const app = express()

// post projects
projectRouter.post('/add', createProject)
projectRouter.get('/get/:id',getProject)
projectRouter.get('/get/w/allprojects',getallProjects)

module.exports = projectRouter;