const { createProfessor, getProfessors } = require('../models/professors');

async function createProfessorHandler(req, res) {
    try{
        const {name, email, department, address} = req.body;
        const professor = await createProfessor(name, email, department, address);
        res.status(201).json(professor);
    } catch (err) {
        console.error('Error(profControl-create) creating professor:', err);
        res.status(500).json({error: 'Internal server error(profControl-create)'});
    }
}


async function getProfessorsHandler(req, res) {
    try {
      const professors = await getProfessors();
      res.status(200).json(professors);
    } catch (err) {
      console.error('Error (profControl=get) getting professors:', err);
      res.status(500).json({ error: 'Internal server error (profControl-get)' });
    }
  }
  
  module.exports = { createProfessorHandler, getProfessorsHandler };