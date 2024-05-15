const {client}= require('../config/db');

async function createStudent(name, email, department, addldetails) {
    const db = await client();
    const students = db.collection('students');
    const result = await students.insertOne({name, email, department, addldetails});
    return result.ops[0];
}


async function getStudents() {
    const db = await client();
    const students = db.collection('students');
    return students.find({}).toArray();
  }

module.exports = { createStudent, getStudents };