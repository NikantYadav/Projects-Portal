const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const project = require('../models/project.model.js')

async function createProject(req, res) {
    try{
        const proj = await project.create(req.body);
        res.status(200).json(proj);
        console.log('project created successfully!')
    } catch (error) {
        res.status(500).json({message: error.message});
    }
} 


async function getProject(req, res) {
    try {
        const id = req.params.id;
        const projectID = await project.findById(id).exec();
        if (!projectID) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(projectID);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error (getProject)' });
    }
}


async function getallProjects(req, res) {
    try {
        const filter = {};
        const allProjects = await project.find(filter);
        res.json(allProjects);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: 'Server Error(getallProjects'});
    }
}

module.exports = {createProject, getProject, getallProjects}; 
