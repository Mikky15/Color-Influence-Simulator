import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChromePicker } from "react-color";
import { swirlingLogo } from "../assets";
import shapes from "../assets/shapes/shapes"; // Import shapes.js

const ShapeSelector = ({ shape, setShape, shapeColor, setShapeColor }) => {
  const [selectedShape, setSelectedShape] = useState(shape || null);
  const navigate = useNavigate();

  const handleShapeSelect = (shapeId) => {
    setSelectedShape(Number(shapeId)); // Ensure id is a number
    setShape(Number(shapeId)); // Update the parent state
  };

  const handleColorChange = (updatedColor) => {
    setShapeColor(updatedColor.hex); // Update color in the parent component
  };

  const selectedComponent = shapes.find(
    (shape) => shape.id === selectedShape
  )?.Component;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <img src={swirlingLogo} width={120} alt="Logo" className="rounded-xl" />
      <h1 className="text-3xl font-extrabold mb-4 text-center">
        Choose a Shape and Color
      </h1>

      {/* Shape selection buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
        {shapes.map(({ id, Component }) => (
          <button
            key={id}
            onClick={() => handleShapeSelect(id)}
            className={`flex items-center justify-center p-4 rounded-lg transition transform ${
              selectedShape === id
                ? "bg-green-600 scale-105"
                : "bg-gray-700 hover:bg-gray-500"
            }`}
            aria-label={`Select Shape ${id}`}
          >
            {/* Render the shape component as the button content */}
            <Component width={60} height={60} fill={shapeColor} />
          </button>
        ))}
      </div>

      {/* Color Picker */}
      {selectedComponent && (
        <div className="mt-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Pick a Color</h2>
          <ChromePicker
            color={shapeColor}
            onChange={handleColorChange}
            className="shadow-lg rounded-md"
          />
        </div>
      )}

      {/* Display message when no shape is selected */}
      {!selectedComponent && (
        <p className="text-gray-400 mt-6">
          No shape selected
        </p>
      )}

      {/* Next button */}
      <button
        className={`mt-8 px-6 py-3 rounded-lg font-bold transition ${
          selectedShape
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-500 text-gray-300 cursor-not-allowed"
        }`}
        onClick={() => navigate("/container")}
        disabled={!selectedShape}
      >
        Next
      </button>
    </div>
  );
};

export default ShapeSelector;
