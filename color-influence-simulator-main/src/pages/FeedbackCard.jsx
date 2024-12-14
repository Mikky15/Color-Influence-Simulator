import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook

const FeedbackCard = () => {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null); // Track errors
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate(); // Initialize navigate

  // Dynamic API URL from environment variables
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = async () => {
    if (!answer.trim()) {
      setError("Please provide your feedback before submitting.");
      return;
    }

    const newFeedback = {
      answer: answer.trim(),
      date: new Date().toISOString(),
    };

    setError(null); // Reset any existing error
    setLoading(true); // Set loading state

    try {
      const response = await fetch(`${API_BASE_URL}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFeedback),
      });

      // Check if response is JSON
      const isJson = response.headers
        .get("content-type")
        ?.includes("application/json");
      const responseData = isJson ? await response.json() : null;

      if (response.ok) {
        console.log("Feedback stored:", responseData || newFeedback);
        navigate("/thankyou"); // Navigate to the Thank You page after submission
      } else {
        console.error(
          "Error saving feedback:",
          responseData?.error || "Unknown error"
        );
        setError(
          responseData?.error || "Failed to save feedback. Please try again."
        );
      }
    } catch (networkError) {
      console.error("Network error:", networkError);
      setError(
        "A network error occurred. Please check your connection and try again."
      );
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="feedback-container">
      <style>
        {`
          .feedback-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #0a0c2c; /* Dark background */
          }

          .feedback-card {
            background-color: #ffffff;
            border-radius: 20px;
            padding: 30px;
            width: 350px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
            text-align: center;
          }

          .feedback-question {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
            color: #000000;
          }

          .feedback-input {
            width: 100%;
            height: 100px;
            padding: 10px;
            font-size: 16px;
            border-radius: 10px;
            border: 1px solid #ddd;
            outline: none;
            resize: none;
            margin-bottom: 20px;
            font-family: Arial, sans-serif;
            color: #000000;
            background-color: #ffffff;
          }

          .feedback-input::placeholder {
            color: #888;
          }

          .feedback-button {
            background-color: ${
              loading ? "#cccccc" : "#00e6c3"
            }; /* Cyan color or grey when loading */
            border: none;
            color: #000;
            font-weight: bold;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: ${loading ? "not-allowed" : "pointer"};
            font-size: 16px;
            transition: background-color 0.3s;
          }

          .feedback-button:hover {
            background-color: ${
              loading ? "#cccccc" : "#00ccac"
            }; /* Slightly darker cyan */
          }

          .feedback-error {
            color: red;
            margin-top: 10px;
            font-size: 14px;
          }
        `}
      </style>
      <div className="feedback-card">
        <p className="feedback-question">
          What is it about this product that represents your flavor?
        </p>
        <textarea
          className="feedback-input"
          value={answer}
          onChange={handleInputChange}
          placeholder="Type your answer here..."
          disabled={loading} // Disable input while loading
        />
        <button
          className="feedback-button"
          onClick={handleSubmit}
          disabled={loading} // Disable button while loading
        >
          {loading ? "Submitting..." : "DONE"}
        </button>
        {error && <p className="feedback-error">{error}</p>}{" "}
        {/* Show error message */}
      </div>
    </div>
  );
};

export default FeedbackCard;
