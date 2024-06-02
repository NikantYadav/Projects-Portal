const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const professor = require('../models/professor.model.js');
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()



async function setPassword(key) {
    const salt = crypto.randomBytes(16).toString('hex')
    const password = crypto.pbkdf2Sync(key, salt, 310000, 32, 'sha256').toString('hex')
    return {password, salt};
}


async function createProfessor(req, res) {
    try{
        const {password,salt} = await setPassword(req.body.password)
        req.body.password = password
        const prof = await professor.create({...req.body,salt:salt});
        const token = jwt.sign({ userType: prof.type, userID: prof._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({token: token ,success: true})
        console.log('Professor created successfully!')
    } catch (error) {
        res.status(500).json({success: false ,message: error.message});
        console.log('Professor creation failed')
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
