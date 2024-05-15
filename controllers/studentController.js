const { createStudent, getStudents } = require('../models/students');

async function createStudentHandler(req, res) {
    try{
        const {name, email, department, addldetails} = req.body;
        const student = await createStudent(name, email, department, addldetails);
        res.status(201).json(student);
    } catch (err) {
        console.error('Error (studControl)creating student:', err);
        res.status(500).json({error: 'Internal server error(studControl)'});
    }
}


async function getStudentsHandler(req, res) {
    try {
      const students = await getStudents();
      res.status(200).json(students);
    } catch (err) {
      console.error('Error(studControl) getting students:', err);
      res.status(500).json({ error: 'Internal server error(studControl)' });
    }
  }
  
  module.exports = { createStudentHandler, getStudentsHandler };