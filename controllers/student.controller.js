const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const student = require('../models/student.model.js')

async function createStudent(req, res) {
    try{
        const stud = await student.create(req.body);
        res.status(200).json(stud);
        console.log('student created successfully!')
    } catch (error) {
        res.status(500).json({message: error.message});
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
