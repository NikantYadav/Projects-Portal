const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const professor = require('../models/professor.model.js')

async function createProfessor(req, res) {
    try{
        const prof = await professor.create(req.body);
        res.status(200).json(prof);
        console.log('Professor created successfully!')
    } catch (error) {
        res.status(500).json({message: error.message});
    }
} 


async function getProfessor(req, res) {
    try {
        const id = req.params.id;
        const professorID = await professor.findById(id).exec();
        if (!professorID) {
            return res.status(404).json({ error: 'Professor not found' });
        }
        res.json(professorID);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error (getProfessor)' });
    }
}


async function getallProfessors(req, res) {
    try {
        const filter = {};
        const allProfessors = await professor.find(filter);
        res.json(allProfessors);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: 'Server Error(getallProfessors'});
    }
}

module.exports = {createProfessor, getProfessor, getallProfessors}; 
