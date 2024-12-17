import React, { useState, useEffect } from "react";

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null); // State to track errors
  const [loading, setLoading] = useState(true); // State to track loading

  // Dynamic API URL based on environment
  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    // Fetch feedbacks from the server
    fetch(`${API_BASE_URL}/api/feedback`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setFeedbacks(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching feedbacks:", error);
        setError("Failed to fetch feedbacks. Please try again later.");
      })
      .finally(() => setLoading(false)); // Stop loading after fetch
  }, [API_BASE_URL]);

  return (
    <div className="admin-feedback-container">
      <style>
        {`
          .admin-feedback-container {
            padding: 40px;
            font-family: 'Arial', sans-serif;
            background-color: #f0f4f8;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }

          .feedback-header {
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 30px;
            color: #333;
            text-align: center;
          }

          .loading-message, .error-message {
            text-align: center;
            font-size: 16px;
            color: #555;
            margin-top: 20px;
          }

          .error-message {
            color: #e74c3c;
          }

          .feedback-list {
            list-style: none;
            padding: 0;
            margin: 0;
            max-width: 900px;
            width: 100%;
          }

          .feedback-item {
            display: flex;
            flex-direction: column;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease-in-out;
          }

          .feedback-item:hover {
            transform: scale(1.03);
          }

          .feedback-image {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin-bottom: 12px;
          }

          .feedback-content {
            flex: 1;
          }

          .feedback-date {
            font-size: 14px;
            color: #888;
            margin-top: 10px;
          }

          .feedback-answer {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
          }

          /* Responsive Design for larger screens */
          @media (min-width: 768px) {
            .feedback-item {
              flex-direction: row;
              align-items: center;
            }

            .feedback-image {
              max-width: 150px;
              margin-right: 20px;
            }

            .feedback-content {
              flex: 1;
            }
          }
        `}
      </style>
      <h1 className="feedback-header">Admin Feedback</h1>
      {loading && <p className="loading-message">Loading feedbacks...</p>}{" "}
      {/* Show a loading message */}
      {error && <p className="error-message">{error}</p>}{" "}
      {/* Show error message */}
      {!loading && !error && (
        <ul className="feedback-list">
          {feedbacks.length === 0 ? (
            <p className="loading-message">No feedbacks available.</p>
          ) : (
            feedbacks.map((feedback, index) => (
              <li key={index} className="feedback-item">
                {/* Check if image is Base64 and display */}
                {feedback.image && feedback.image.startsWith("data:image") ? (
                  <img
                    src={feedback.image}
                    alt="Feedback"
                    className="feedback-image"
                  />
                ) : (
                  <p>No image available</p> // Handle missing or invalid image
                )}

                <div className="feedback-content">
                  <p className="feedback-answer">{feedback.answer}</p>
                  <p className="feedback-date">
                    <strong>Date:</strong>{" "}
                    {new Date(feedback.date).toLocaleDateString()} <br />
                    <strong>Time:</strong>{" "}
                    {new Date(feedback.date).toLocaleTimeString()}
                  </p>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default AdminFeedback;
