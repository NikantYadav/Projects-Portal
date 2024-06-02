const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const student = require('../models/student.model.js')
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()



async function setPassword(key) {
    const salt = crypto.randomBytes(16).toString('hex')
    const password = crypto.pbkdf2Sync(key, salt, 310000, 32, 'sha256').toString('hex')
    return {password, salt};
}


async function createStudent(req, res) {
    try{
        const {password,salt} = await setPassword(req.body.password)
        req.body.password = password
        const stud = await student.create({...req.body, salt:salt})
        const token = jwt.sign({ userType: stud.type, userID: stud._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
        res.status(200).json({token: token ,success: true})
        console.log('Student created successfully!')
    } catch (error) {
        res.status(500).json({success: false ,message: error.message});
        console.log('Student creation failed')
    }
} 

async function getStudent(req, res) {
    try {
        const id = req.params.id;
        const studentID = await student.findById(id).exec();
        if (!studentID) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.json(studentID);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error (getStudent)' });
    }
}

async function getallStudents(req, res) {
    try {
        const filter = {};
        const allStudents = await student.find(filter);
        res.json(allStudents);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: 'Server Error(getallStudents'});
    }
}


module.exports = {createStudent, getStudent, getallStudents}; 
