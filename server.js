const express = require('express');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors');

const authRouter = require('./routes/auth.route.js')
const loginRouter = require('./routes/login.route.js')
const professorRouter = require('./routes/professor.route.js');
const studentRouter = require('./routes/student.route.js');
const projectRouter = require('./routes/project.route.js');
const app = express()

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.static(path.join(__dirname, 'public/files')));

dotenv.config()

app.use(bodyParser({extended:true}))
app.use(morgan("dev"))
app.use(express.json());    //middleware




mongoose.connect("mongodb+srv://nikantyadav6803:mydb1@cluster0.vcgsfrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then (function() {
    console.log('Connected to database!');
    app.listen(3001, function(){
        console.log('Server is running on port 3001')
    })
})
.catch (function() {
    console.log('Connection failed to database!')
});

app.set('view engine', 'pug');

app.use('/auth', authRouter)
app.use('/login', loginRouter)
app.use('/professor', professorRouter);
app.use('/student', studentRouter);
app.use('/project', projectRouter);



app.use('*', function(req, res){
    res.status(404).send('Page not Found')
})