import React from "react";

// Define the dynamic shapes with their predefined colors
const shapeProps = {
  Circle: (key, color) => (
    <circle key={key} cx="5" cy="5" r="3" fill={color} />
  ),
  Square: (key, color) => (
    <rect key={key} x="0" y="0" width="6" height="6" fill={color} />
  ),
  Triangle: (key, color) => (
    <polygon key={key} points="5,0 10,10 0,10" fill={color} />
  ),
};

// Define default colors for each shape
const shapes = {
  Circle: "bg-blue-500",
  Square: "bg-red-500",
  Triangle: "bg-yellow-500",
};

const PatternOverlay = ({ shape }) => {
  if (!shape) return null;

  // Define the color based on the shape
  const shapeColor = shapes[shape];

  return (
    <div className="absolute w-full h-full flex flex-wrap gap-2">
      {Array(50) // Adjust the number of shapes as needed
        .fill(0)
        .map((_, index) =>
          shapeProps[shape](index, shapeColor) // Render shapes with the defined color
        )}
    </div>
  );
};

export default PatternOverlay;
