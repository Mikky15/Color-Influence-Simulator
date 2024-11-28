import React from "react";
import PropTypes from "prop-types";

// Updated PatternOverlay to accept SVG components dynamically
const PatternOverlay = ({ ShapeComponent, svgColor = "white" }) => {
  console.log("ShapeComponent:", ShapeComponent); // Add this for debugging

  if (!ShapeComponent) {
    console.warn("No valid ShapeComponent passed to PatternOverlay!"); // Logging a warning if the component is missing
    return null;
  }

  return (
    <div className="absolute w-full h-full flex flex-wrap gap-2">
      {Array(25) // Adjust the number of shapes as needed
        .fill(0)
        .map((_, index) => (
          <ShapeComponent key={index} className="w-6 h-6" style={{ fill: svgColor }} />
        ))}
    </div>
  );
};

// PropTypes validation to ensure the passed component is a valid React component
PatternOverlay.propTypes = {
  ShapeComponent: PropTypes.elementType.isRequired, // Ensure it's a valid React component
  svgColor: PropTypes.string, // Optional prop to pass color to SVG
};

export default PatternOverlay;
