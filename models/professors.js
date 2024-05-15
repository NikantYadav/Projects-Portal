const { connectToMongoDB } = require('../config/db');

async function createProfessor(name, email, department, address) {
    try {
        const client = await connectToMongoDB();
        const db = await client.db("Cluster0");
        const professors = db.collection('professors');
        const result = await professors.insertOne({ name, email, department, address });
        if (result.ops && result.ops.length > 0) {
          return result.ops[0];
      } else {
          throw new Error("No professor created");
      }
  } catch (error) {
      console.error("Error creating professor:", error);
      throw error;
  }
    }


async function getProfessors() {
    try {
      const client = await connectToMongoDB();
        const db = await client.db("Cluster0");
        const professors = db.collection('professors');
        return professors.find({}).toArray();
    } catch (error) {
        console.error("Error fetching professors:", error);
        throw error;
    }
}

module.exports = { createProfessor, getProfessors };
