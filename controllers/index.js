//initial test function from W1
const awesomeFunction = (req, res, next) => {
    res.json('Ethan Creviston')
};

//functions for W3 assignment
const { ObjectId } = require('mongodb');
const client = require('../server'); // Import the MongoDB client from server.js

// Create a new contact
const createContact = async (req, res) => {
  const contact = req.body;
  const requiredFields = ['firstName', 'lastName', 'email', 'favoriteColor', 'birthday'];

  for (const field of requiredFields) {
    if (!contact[field]) {
      return res.status(400).json({ error: `${field} is required.` });
    }
  }

  try {
    const result = await client
      .db('contactsDB')
      .collection('contacts')
      .insertOne(contact);

    res.status(201).json({
      acknowledged: result.acknowledged,
      insertedId: result.insertedId
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to insert contact' });
  }
};

// Update a contact
const updateContact = async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const result = await client
      .db('contactsDB')
      .collection('contacts')
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
};

// Delete a contact
const deleteContact = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await client
      .db('contactsDB')
      .collection('contacts')
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
};

module.exports = {
  awesomeFunction,
  createContact,
  updateContact,
  deleteContact
};