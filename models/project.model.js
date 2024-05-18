const mongodb = require('mongodb');
const mongoose = require('mongoose');

const projectschema = new mongoose.Schema({
    name: {
        type: String,
        required: [true]
    },
    department: {
        type: String,
        required: [true]
    },
    details: {
        type: String,
        required: [true]
    },
    prereq: {
        type: String,
        required: [true]
    },
    duration: {
        type: String,
        required: [true]
    }
    
});

const project = mongoose.model("project", projectschema)

module.exports = project;