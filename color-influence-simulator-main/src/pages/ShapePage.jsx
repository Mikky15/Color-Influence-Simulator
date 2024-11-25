import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { swirlingLogo } from "../assets";

// Shape options and their styles for selection
const shapes = [
  { label: "Circle", style: "w-6 h-6 bg-blue-500 rounded-full" },
  { label: "Square", style: "w-6 h-6 bg-red-500" },
  {
    label: "Triangle",
    style:
      "w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-b-[30px] border-b-yellow-500",
  },
];

const ShapeSelector = ({ shape, setShape }) => {
  const [selectedShape, setSelectedShape] = useState(shape); // Initialize with the current shape
  const navigate = useNavigate();

  // Handle shape selection and update the parent component's state
  const handleShapeSelect = (shapeLabel) => {
    setSelectedShape(shapeLabel);
    setShape(shapeLabel);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <img src={swirlingLogo} width={100} alt="Logo" className="rounded-xl" />
      <h1 className="text-2xl font-bold mb-4">Choose a Shape</h1>

      {/* Buttons to choose shape */}
      <div className="flex space-x-4 mb-8">
        {shapes.map((shape, index) => (
          <button
            key={index}
            onClick={() => handleShapeSelect(shape.label)}
            className={`px-4 py-2 rounded ${
              selectedShape === shape.label
                ? "bg-green-500"
                : "bg-gray-700 hover:bg-gray-500"
            }`}
          >
            {shape.label}
          </button>
        ))}
      </div>

      {/* Display selected shape with pattern */}
      <div className="mt-8 flex items-center justify-center p-10 bg-gray-800 rounded-md">
        {/* SVG pattern */}
        <svg
          className="w-32 h-32"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          style={{ fill: "currentColor" }} // Use currentColor for the container
        >
          <defs>
            <pattern id="dynamicPattern" patternUnits="userSpaceOnUse" width="20" height="20">
              {/* Render the selected shape inside the pattern */}
              {selectedShape === "Circle" && (
                <circle cx="10" cy="10" r="8" fill="yellow" />
              )}
              {selectedShape === "Square" && (
                <rect x="5" y="5" width="10" height="10" fill="blue" />
              )}
              {selectedShape === "Triangle" && (
                <polygon
                  points="10,3 3,18 17,18"
                  fill="red"
                />
              )}
            </pattern>
          </defs>
          {/* Rectangle with the pattern fill */}
          <rect x="0" y="0" width="100" height="100" fill="url(#dynamicPattern)" />
        </svg>
      </div>

      {/* Next button to navigate to another page */}
      <button
        className="mt-8 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => navigate("/container")}
        disabled={!selectedShape}
      >
        Next
      </button>
    </div>
  );
};

export default ShapeSelector;
