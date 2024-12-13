// Import required libraries
require('dotenv').config();  // Load environment variables from .env file
const { MongoClient } = require('mongodb');

// MongoDB URI from the environment variable
const uri = process.env.MONGODB_URI; // MongoDB connection string from .env

// MongoDB client instance
let client;

async function connectDB() {
  if (client) {
    return client;
  }
  
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  return client;
}

// POST endpoint to receive feedback and save it to MongoDB
module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const newFeedback = req.body;

    // Input validation (basic example, can be extended)
    if (!newFeedback.answer || !newFeedback.date) {
      return res.status(400).json({ error: 'Answer and date are required' });
    }

    try {
      const dbClient = await connectDB();
      const feedbacksCollection = dbClient.db('feedbackDB').collection('feedbacks');

      await feedbacksCollection.insertOne(newFeedback);
      res.status(200).json({ message: 'Feedback saved successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  } else if (req.method === 'GET') {
    try {
      const dbClient = await connectDB();
      const feedbacksCollection = dbClient.db('feedbackDB').collection('feedbacks');
      
      const feedbacks = await feedbacksCollection.find().toArray();
      res.status(200).json(feedbacks);
    } catch (err) {
      res.status(500).json({ error: 'Error fetching feedbacks' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
