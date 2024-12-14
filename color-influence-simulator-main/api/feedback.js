require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

// Create Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for all origins (adjust for security as needed)

// MongoDB URI from the environment variable
const uri = process.env.MONGODB_URI;
console.log(`MongoDB URI: ${uri}`); // Log the URI to verify it's correctly set

// MongoDB client instance
let client;

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri); // Removed deprecated options
    try {
      await client.connect();
    } catch (err) {
      console.error('MongoDB connection error:', err); // Log connection errors
      throw err;
    }
  }
  return client;
}

// POST endpoint to receive feedback and save it to MongoDB
app.post('/api/feedback', async (req, res) => {
  const { answer, date } = req.body;

  // Input validation
  if (!answer || !date) {
    return res.status(400).json({ error: 'Answer and date are required' });
  }

  try {
    const dbClient = await connectDB();
    const feedbacksCollection = dbClient.db('feedbackDB').collection('feedbacks');

    await feedbacksCollection.insertOne({ answer, date });
    res.status(200).json({ message: 'Feedback saved successfully' });
  } catch (err) {
    console.error('Error saving feedback:', err); // Log error to console
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET endpoint to fetch all feedbacks
app.get('/api/feedback', async (req, res) => {
  try {
    const dbClient = await connectDB();
    const feedbacksCollection = dbClient.db('feedbackDB').collection('feedbacks');

    const feedbacks = await feedbacksCollection.find().toArray();
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error('Error fetching feedbacks:', err); // Log error to console
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; // Ensure compatibility with Vercel's serverless functions
