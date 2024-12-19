const { MongoClient } = require("mongodb");
const cors = require("cors");
const express = require("express");
const { Buffer } = require("buffer");
require("dotenv").config();

// Create Express app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors()); // Enable CORS for all origins (adjust for security as needed)

// MongoDB URI from the environment variable
const uri = process.env.MONGODB_URI;

// MongoDB client instance
let client;

async function connectDB() {
  if (!client) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    try {
      await client.connect();
      console.log("Connected to MongoDB");
    } catch (err) {
      console.error("MongoDB connection error:", err); // Log connection errors
      throw err;
    }
  }
  return client;
}

// POST endpoint to receive feedback and save it to MongoDB
app.post("/api/feedback", async (req, res) => {
  const { answer, image, date, flavor } = req.body; // Include flavor

  // Input validation
  if (!answer || !date) {
    return res.status(400).json({ error: "Answer and date are required" });
  }

  if (typeof answer !== "string" || !answer.trim()) {
    return res
      .status(400)
      .json({ error: "Answer must be a valid non-empty string" });
  }

  // Validate flavor (optional, but if provided, must be a string)
  if (flavor && typeof flavor !== "string") {
    return res.status(400).json({ error: "Flavor must be a valid string" });
  }

  let imageData = null;
  if (image) {
    // Validate and decode Base64 image
    if (image.startsWith("data:image")) {
      const matches = image.match(/^data:image\/([a-zA-Z]*);base64,([^\\"]+)$/);
      if (matches && matches.length === 3) {
        const buffer = Buffer.from(matches[2], "base64");
        imageData = buffer;
      } else {
        return res.status(400).json({ error: "Invalid Base64 image format" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Image must be a valid Base64 string" });
    }
  }

  // Validate the date string and parse it
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ error: "Invalid date format" });
  }

  const feedbackData = {
    answer: answer.trim(),
    date: parsedDate, // Ensure date is valid
    flavor: flavor ? flavor.trim() : null, // Add flavor if provided
  };

  if (imageData) {
    feedbackData.image = imageData; // Save the image as binary data
  }

  try {
    const dbClient = await connectDB();
    const feedbacksCollection = dbClient
      .db("feedbackDB")
      .collection("feedbacks");

    // Save the feedback with answer, optional image, date, and flavor
    await feedbacksCollection.insertOne(feedbackData);
    res.status(200).json({ message: "Feedback saved successfully" });
  } catch (err) {
    console.error("Error saving feedback:", err); // Log error to console
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET endpoint to fetch all feedbacks
app.get("/api/feedback", async (req, res) => {
  try {
    const dbClient = await connectDB();
    const feedbacksCollection = dbClient
      .db("feedbackDB")
      .collection("feedbacks");

    const feedbacks = await feedbacksCollection.find().toArray();

    // Return feedbacks with images as Base64 (if available)
    const formattedFeedbacks = feedbacks.map((feedback) => {
      if (feedback.image) {
        // Convert image binary to Base64 string
        feedback.image = `data:image/jpeg;base64,${feedback.image.toString(
          "base64"
        )}`;
      }
      return feedback;
    });

    res.status(200).json(formattedFeedbacks);
  } catch (err) {
    console.error("Error fetching feedbacks:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Vercel uses a serverless function, so we export the app
module.exports = app; // This will allow Vercel to run it as a function
