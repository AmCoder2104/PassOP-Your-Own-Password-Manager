const express = require('express')
const app = express()
const port = 3000
require('dotenv').config()
console.log(process.env.MONGO_URL)
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');
// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
app.use(bodyParser.json());
app.use(cors());
// Database Name
const dbName = 'Passop';
 client.connect();
//  Get all pass 
 app.get('/', async(req, res) => {
      const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
  res.json(findResult);
})
// Saved all pass 
 app.post('/', async(req, res) => {
  const passwords = req.body;
      const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(passwords);
  res.json({success: true, result: findResult});
})
// Delete all pass 
    app.delete('/', async(req, res) => {
      const {passwords} = req.body;
        const db = client.db(dbName);
        const collection = db.collection('passwords');
        const findResult = await collection.deleteOne({passwords});
        res.json({success: true, result: findResult});
    })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})