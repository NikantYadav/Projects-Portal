const mongodb = require('mongodb');
const mongoose = require('mongoose');

const professorschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true]
    },
    department: {
        type: String,
        required: [true]
    },
    address: {
        type: String,
        required: [true]
    },
    email: {
        type: String,
        required: [true]
    }
    
});

const professor = mongoose.model("professor", professorschema)

module.exports = professor;