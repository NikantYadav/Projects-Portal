const express  = require('express');
const bodyParser = require('body-parser');
const professorRoutes = require('./routes/professorRoutes.js')
const studentRoutes = require('./routes/studentRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use('/professors', professorRoutes);
app.use('/students', studentRoutes);
app.use('/projects', projectRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });