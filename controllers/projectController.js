const { createProject, getProjects } = require('../models/projects');

async function createProjectHandler(req, res) {
    try{
        const {name, department, details, prereq, duration} = req.body;
        const project = await createProject(name, department, details, prereq, duration);
        res.status(201).json(project);
    } catch (err) {
        console.error('Error (projControl)creating project:', err);
        res.status(500).json({error: 'Internal server error(projControl) '});
    }
}


async function getProjectsHandler(req, res) {
    try {
      const projects = await getProjects();
      res.status(200).json(projects);
    } catch (err) {
      console.error('Error (projControl) getting projects:', err);
      res.status(500).json({ error: 'Internal server error (projControl)' });
    }
  }
  
  module.exports = { createProjectHandler, getProjectsHandler };