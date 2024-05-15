const {client} = require('../config/db');

async function createProject(name, department, details, prereq, duration) {
    const db = await client();
    const projects = db.collection('projects');
    const result = await projects.insertOne({name, department, details, prereq, duration});
    return result.ops[0];
}


async function getProjects() {
    const db = await client();
    const projects = db.collection('projects');
    return projects.find({}).toArray();
  }

module.exports = { createProject, getProjects };