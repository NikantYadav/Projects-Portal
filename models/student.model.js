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
        required: [true],
        unique: [true]
    },
    rollnumber: {
        type: String,
        required: [true]
    }, 
    type: {
        type: String,
        required:[true],
    },
    program: {
        type: String,
        required: [true]
    },
    password : {type: String, required: [true]}, 
    salt:  {type: String}
    
});


const student = mongoose.model("student", studentschema);

module.exports = student;