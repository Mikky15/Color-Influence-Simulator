import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toPng } from "html-to-image"; // Import html-to-image
import { swirlingLogo } from "../assets";
import shapes from "../assets/shapes/shapes"; // Import the shapes array

const ResultContainer = ({
  shape,
  shapeColor,
  color,
  container,
  flavor,
  containerPath,
  containerViewBox,
}) => {
  const [patternSize, setPatternSize] = useState(20); // Initial pattern size
  const [errorMessage, setErrorMessage] = useState(null); // Error state for feedback
  const navigate = useNavigate(); // Initialize navigate
  const containerRef = useRef(null); // Reference for container div

  // Dynamic API base URL
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

  // Validate API base URL
  const validateApiUrl = (url) => {
    try {
      return new URL(url).href;
    } catch (error) {
      console.error("Invalid API URL:", error.message);
      return null;
    }
  };

  const validatedApiUrl = validateApiUrl(API_BASE_URL);

  // If shape is null, do not try to find a shape.
  const selectedShape = shape
    ? shapes.find((shapeObj) => shapeObj.id === shape)
    : null;

  // Function to handle pattern resizing
  const handleResizePattern = (newSize) => {
    setPatternSize(Math.max(5, newSize)); // Ensure the pattern size is not negative
  };

  // Function to save the design and navigate to the feedback page
  const handleSaveAndNavigate = async () => {
    if (!containerRef.current) {
      setErrorMessage("No container reference found.");
      return;
    }

    if (!validatedApiUrl) {
      setErrorMessage("Invalid API URL. Please check the environment variables.");
      return;
    }

    try {
      // Convert the container to a Base64 image
      const imageData = await toPng(containerRef.current);

      // Post the image data to the backend
      const response = await fetch(`${validatedApiUrl}/api/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }), // Only sending the image
      });

      if (response.ok) {
        console.log("Image saved successfully");
        navigate("/feedback");
      } else {
        const errorData = await response.json();
        console.error("Failed to save image:", errorData.message || response.statusText);
        setErrorMessage(
          errorData.message || "An error occurred while saving the image."
        );
      }
    } catch (err) {
      console.error("Error saving image:", err.message);
      setErrorMessage("Unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative">
      <img src={swirlingLogo} width={100} alt="Logo" className="rounded-xl" />
      <h1 className="text-2xl font-bold mb-4 text-center">
        Look at your amazing <br /> Yogurt Container
      </h1>

      <div ref={containerRef} className="relative mt-8 w-64 h-64">
        {/* Render the selected container with dynamic color */}
        {container && container.Component ? (
          <div className="absolute w-full h-full z-10">
            <container.Component
              className="w-full h-full object-cover z-10"
              style={{ color: color }} // Apply the color to the container SVG
            />

            {/* Render the pattern */}
            {selectedShape?.Component && containerPath && containerViewBox && (
              <svg
                className="absolute inset-0 z-20 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
                viewBox={containerViewBox} // Apply the dynamic viewBox here
                preserveAspectRatio="xMidYMid meet" // Center the pattern relative to container viewBox
                style={{ pointerEvents: "none" }} // Ensures the pattern does not block interaction
              >
                <defs>
                  {/* Define the pattern with dynamic size */}
                  <pattern
                    id="dynamicPattern"
                    patternUnits="userSpaceOnUse"
                    width={patternSize} // Dynamic pattern width
                    height={patternSize} // Dynamic pattern height
                  >
                    {/* Use the selected shape component */}
                    <selectedShape.Component
                      width={patternSize}
                      height={patternSize}
                      fill={shapeColor} // Dynamically set the shape color
                    />
                  </pattern>

                  {/* Clip the pattern to the dynamic container path */}
                  <clipPath id="containerClip">
                    <path d={containerPath} />
                  </clipPath>
                </defs>

                {/* Apply the pattern and clip it to the container's path */}
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#dynamicPattern)"
                  clipPath="url(#containerClip)"
                />
              </svg>
            )}
          </div>
        ) : (
          <p className="text-gray-400">No container selected</p>
        )}
      </div>

      {/* Display error message if any */}
      {errorMessage && (
        <div className="mt-4 p-4 bg-red-600 text-white rounded">
          {errorMessage}
        </div>
      )}

      {/* Resize pattern controls */}
      <div className="mt-8 flex flex-col items-center space-y-4">
        <h3 className="text-lg">Resize Pattern</h3>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => handleResizePattern(patternSize - 5)} // Decrease pattern size
            className="bg-gray-500 px-4 py-2 text-white rounded"
          >
            Smaller
          </button>
          <span className="text-xl">{patternSize} px</span>
          <button
            onClick={() => handleResizePattern(patternSize + 5)} // Increase pattern size
            className="bg-gray-500 px-4 py-2 text-white rounded"
          >
            Larger
          </button>
        </div>
      </div>

      {/* Display selected color */}
      <div className="mt-8 flex items-center space-x-4">
        <h3 className="text-lg">Selected Color:</h3>
        <div
          className="w-10 h-10 rounded border"
          style={{
            backgroundColor: color, // Show the selected color
          }}
        ></div>
      </div>

      {/* Display selected flavor */}
      <div className="mt-4 flex flex-col items-center">
        <h3 className="text-lg mb-2">Selected Flavor:</h3>
        <p
          className="px-4 py-2 text-center bg-gray-800 rounded text-white"
          style={{
            minWidth: "150px", // Ensures a consistent size for the display
          }}
        >
          {flavor}
        </p>
      </div>

      {/* Action buttons */}
      <div className="py-10">
        <h1>Are you happy with your design?</h1>
      </div>

      <div className="flex gap-5">
        <a className="bg-cyan-500 mt-4 px-10 py-3 text-white rounded-full" href="/">
          START OVER
        </a>
        <button
          className="bg-cyan-500 mt-4 px-10 py-3 text-white rounded-full"
          onClick={handleSaveAndNavigate}
        >
          YES
        </button>
      </div>
    </div>
  );
};

export default ResultContainer;
