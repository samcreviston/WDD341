const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const client = require('../server'); // Import the MongoDB client from server.js

//import for W3 CRUD Assignment
const {
  createContact,
  updateContact,
  deleteContact
} = require('../controllers/index');

// Access the database collection only after the client is connected
router.get('/', async (req, res) => {
  try {
    const db = client.db('contactsDB'); // Access database after MongoDB client is connected
    const contactsCollection = db.collection('contacts');
    const contacts = await contactsCollection.find().toArray();
    res.json(contacts);
  } catch (err) {
    res.status(500).send('Error fetching contacts: ' + err.message); // Send error if DB query fails
  }
});

// GET one contact by ID
router.get('/:id', async (req, res) => {
  try {
    const db = client.db('contactsDB'); // Access database after MongoDB client is connected
    const contactsCollection = db.collection('contacts');
    const contact = await contactsCollection.findOne({ _id: new ObjectId(req.params.id) });
    if (!contact) return res.status(404).send('Not found');
    res.json(contact);
  } catch (err) {
    res.status(500).send('Error fetching contact: ' + err.message); // Send error if DB query fails
  }
});

// POST /contacts
router.post('/', createContact);

// PUT /contacts/:id
router.put('/:id', updateContact);

// DELETE /contacts/:id
router.delete('/:id', deleteContact);

module.exports = router;