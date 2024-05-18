const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const professorRouter = require('./routes/professor.route.js');
const studentRouter = require('./routes/student.route.js');
const projectRouter = require('./routes/project.route.js');
const app = express()

app.use(express.json());    //middleware
 


mongoose.connect("mongodb+srv://nikantyadav6803:mydb1@cluster0.vcgsfrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then (function() {
    console.log('Connected to database!');
    app.listen(3000, function(){
        console.log('Server is running on port 3000')
    })
})
.catch (function() {
    console.log('Connection failed!')
});

app.use('/professor', professorRouter);
app.use('/student', studentRouter);
app.use('/project', projectRouter)