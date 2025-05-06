var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

require('dotenv').config(); //loads environment variables from a `.env` file into `process.env`.
const { MongoClient } = require('mongodb'); //MongoClient is a class used to connect to MongoDB database and run queries.

const client = new MongoClient(process.env.MONGODB_URI); //creates a new MongoDB client using connection string from the `.env` file.
async function connectDB() {
  try {
    await client.connect(); //attempt to connect to MongoDB
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}
connectDB();
module.exports = client; //exports the client object so other files (like route files) can import and use the database connection.


app.use('/', require('./routes'));
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});