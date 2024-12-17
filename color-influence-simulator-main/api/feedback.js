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
if (process.env.NODE_ENV !== 'production') {
  console.log(`MongoDB URI: ${uri}`); // Log the URI only in non-production environments
}

// MongoDB client instance
let client;

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri); // Removed deprecated options
    try {
      await client.connect();
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err); // Log connection errors
      throw err;
    }
  }
  return client;
}

// POST endpoint to receive feedback and save it to MongoDB
app.post('/api/feedback', async (req, res) => {
  const { answer, image, date } = req.body;

  // Input validation
  if (!answer || !image || !date) {
    return res.status(400).json({ error: 'Answer, image, and date are required' });
  }

  if (typeof answer !== 'string' || !answer.trim()) {
    return res.status(400).json({ error: 'Answer must be a valid non-empty string' });
  }

  if (!image.startsWith('http') || !/\.(jpg|jpeg|png|gif)$/i.test(image)) {
    return res.status(400).json({ error: 'Image must be a valid URL pointing to an image file' });
  }

  const feedbackData = {
    answer: answer.trim(),
    image: image.trim(),
    date: new Date(date), // Ensure date is properly parsed
  };

  try {
    const dbClient = await connectDB();
    const feedbacksCollection = dbClient.db('feedbackDB').collection('feedbacks');

    // Save the feedback with answer, image, and date
    await feedbacksCollection.insertOne(feedbackData);
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
