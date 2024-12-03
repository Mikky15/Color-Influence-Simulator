import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { swirlingLogo } from "../assets";
import PatternOverlay from "./PatternOverlay"; // Updated
import shapes from "../assets/shapes/shapes"; // Import shapes.js

const ShapeSelector = ({ shape, setShape }) => {
  const [selectedShape, setSelectedShape] = useState(shape || null);
  const navigate = useNavigate();

  const handleShapeSelect = (shapeId) => {
    setSelectedShape(Number(shapeId)); // Ensure id is a number
    setShape(Number(shapeId)); // Update the parent state
  };

  // Find the selected component based on the shapeId
  const selectedComponent = shapes.find(
    (shape) => shape.id === selectedShape
  )?.Component;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <img src={swirlingLogo} width={120} alt="Logo" className="rounded-xl" />
      <h1 className="text-3xl font-extrabold mb-4 text-center">
        Choose a Shape
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
            <Component width={60} height={60} />
          </button>
        ))}
      </div>

      {/* Display selected shape */}
      <div className="mt-6 p-6 rounded-lg bg-gray-900 shadow-lg flex items-center justify-center w-full max-w-xs">
        {selectedComponent ? (
          <div className="relative w-40 h-40">
            <PatternOverlay ShapeComponent={selectedComponent} />
          </div>
        ) : (
          <p className="text-gray-400">No shape selected</p>
        )}
      </div>

      {/* Next button */}
      <button
        className={`mt-8 px-6 py-3 rounded-lg font-bold transition ${
          selectedShape
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-gray-500 text-gray-300 cursor-not-allowed"
        }`}
        onClick={() => navigate("/container", { state: { shape: selectedShape } })}
        disabled={!selectedShape}
      >
        Next
      </button>
    </div>
  );
};

export default ShapeSelector;
