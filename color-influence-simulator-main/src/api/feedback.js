// Import required libraries
require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

// Create Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for all origins (adjust for security as needed)

// MongoDB URI from the environment variable
const uri = process.env.MONGODB_URI; // MongoDB connection string from .env

// MongoDB client instance
let client;

async function connectDB() {
  if (client) {
    return client;
  }

  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  return client;
}

// POST endpoint to receive feedback and save it to MongoDB
app.post("/api/feedback", async (req, res) => {
  const newFeedback = req.body;

  // Input validation (basic example, can be extended)
  if (!newFeedback.answer || !newFeedback.date) {
    return res.status(400).json({ error: "Answer and date are required" });
  }

  try {
    const dbClient = await connectDB();
    const feedbacksCollection = dbClient
      .db("feedbackDB")
      .collection("feedbacks");

    await feedbacksCollection.insertOne(newFeedback);
    res.status(200).json({ message: "Feedback saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET endpoint to fetch all feedbacks (optional, useful for debugging)
app.get("/api/feedback", async (req, res) => {
  try {
    const dbClient = await connectDB();
    const feedbacksCollection = dbClient
      .db("feedbackDB")
      .collection("feedbacks");

    const feedbacks = await feedbacksCollection.find().toArray();
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching feedbacks" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
