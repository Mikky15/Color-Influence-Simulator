import React, { useState, useEffect } from 'react';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null); // State to track errors
  const [loading, setLoading] = useState(true); // State to track loading

  // Dynamic API URL based on environment
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    // Fetch feedbacks from the server
    fetch(`${API_BASE_URL}/api/feedbacks`)
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
        console.error('Error fetching feedbacks:', error);
        setError('Failed to fetch feedbacks. Please try again later.');
      })
      .finally(() => setLoading(false)); // Stop loading after fetch
  }, [API_BASE_URL]);

  return (
    <div className="admin-feedback-container">
      <style>
        {`
          .admin-feedback-container {
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
          }

          .feedback-header {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 20px;
            text-align: center;
          }

          .loading-message, .error-message {
            text-align: center;
            font-size: 16px;
            margin-top: 20px;
            color: #555;
          }

          .error-message {
            color: red;
          }

          .feedback-list {
            list-style: none;
            padding: 0;
            margin: 0 auto;
            max-width: 800px;
          }

          .feedback-item {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 15px;
            margin-bottom: 15px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          }

          .feedback-item p {
            margin: 0 0 10px;
          }

          .feedback-date {
            font-size: 14px;
            color: #888;
          }
        `}
      </style>
      <h1 className="feedback-header">Admin Feedback</h1>

      {loading && <p className="loading-message">Loading feedbacks...</p>} {/* Show a loading message */}

      {error && <p className="error-message">{error}</p>} {/* Show error message */}

      {!loading && !error && (
        <ul className="feedback-list">
          {feedbacks.length === 0 ? (
            <p className="loading-message">No feedbacks available.</p>
          ) : (
            feedbacks.map((feedback, index) => (
              <li key={index} className="feedback-item">
                <p>{feedback.answer}</p>
                <p className="feedback-date">
                  <strong>Date:</strong> {new Date(feedback.date).toLocaleDateString()}
                </p>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default AdminFeedback;
