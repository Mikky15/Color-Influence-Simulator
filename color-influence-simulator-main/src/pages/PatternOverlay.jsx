import React from "react";
import PropTypes from "prop-types";

const PatternOverlay = ({ ShapeComponent, svgColor = "white" }) => {
  console.log("ShapeComponent:", ShapeComponent?.name || ShapeComponent); // Enhanced debugging

  if (!ShapeComponent) {
    console.warn("No valid ShapeComponent passed to PatternOverlay!");
    return <p className="text-red-500">Shape could not be rendered.</p>; // Display in UI
  }

  return (
    <div className="absolute w-full h-full flex flex-wrap justify-center items-center gap-2">
      {Array(25) // Adjust the number of shapes if necessary
        .fill(0)
        .map((_, index) => (
          <ShapeComponent
            key={index}
            className="w-6 h-6" // Increased size for better visibility
            style={{ fill: svgColor }}
          />
        ))}
    </div>
  );
};

PatternOverlay.propTypes = {
  ShapeComponent: PropTypes.elementType.isRequired,
  svgColor: PropTypes.string,
};

export default PatternOverlay;
