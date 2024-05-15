const express = require('express');
const app = express();

app.get('/', (req,res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server is listening on port', PORT);
});


const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://nikantyadav6803:mydb1@cluster0.vcgsfrs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
    return client; // Ensure client object is returned after connecting
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
connectToMongoDB().catch(console.dir);
module.exports = { connectToMongoDB  };