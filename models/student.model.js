const mongodb = require('mongodb');
const mongoose = require('mongoose');

const studentschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true]
    },
    department: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true]
    },
    addldetails: {
        type: String,
        required: [false]
    }
    
});

const student = mongoose.model("student", studentschema)

module.exports = student;