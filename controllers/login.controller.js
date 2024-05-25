const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const crypto = require('crypto');
const student = require('../models/student.model');
const professor = require('../models/professor.model.js')

async function verifyEmail(email) {
    try{
        const prof = await professor.findOne({email : email}).exec()
        const stud = await student.findOne({email: email}).exec()
        if (prof !== null || stud!==null ) {
            return {exists: true, object: prof || stud}
        } else {
            return { exists: false, objectId: null };
        }
    } catch (error) {
        console.error('Error checking email in databse:', error)
        throw error
    }
}



module.exports = {verifyEmail}