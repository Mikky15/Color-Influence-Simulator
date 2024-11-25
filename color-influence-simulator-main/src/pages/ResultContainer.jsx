import React, { useState } from "react";
import { swirlingLogo } from "../assets";

const ResultContainer = ({ color, shape, container, flavor, containerPath, containerViewBox }) => {
  const [patternSize, setPatternSize] = useState(20); // Initial pattern size

  // Function to handle pattern resizing
  const handleResizePattern = (newSize) => {
    setPatternSize(newSize); // Update the pattern size state
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative">
      <img src={swirlingLogo} width={100} alt="Logo" className="rounded-xl" />
      <h1 className="text-2xl font-bold mb-4 text-center">
        Look at your amazing <br /> Yogurt Container
      </h1>

      <div className="relative mt-8 w-64 h-64">
        {/* Render the selected container with dynamic color */}
        {container && container.Component ? (
          <div className="absolute w-full h-full z-10">
            <container.Component
              className="w-full h-full object-cover z-10"
              style={{ color: color }} // Apply the color to the container SVG
            />

            {/* Pattern overlay */}
            {shape && containerPath && containerViewBox && (
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
                    {shape === "Circle" && (
                      <circle cx={patternSize / 2} cy={patternSize / 2} r={(patternSize / 2) - 2} fill="yellow" />
                    )}
                    {shape === "Square" && (
                      <rect x="5" y="5" width={patternSize - 10} height={patternSize - 10} fill="blue" />
                    )}
                    {shape === "Triangle" && (
                      <polygon
                        points={`${patternSize / 2},3 ${patternSize / 6},${patternSize - 3} ${patternSize - patternSize / 6},${patternSize - 3}`}
                        fill="red"
                      />
                    )}
                  </pattern>

                  {/* Clip the pattern to the dynamic container path */}
                  <clipPath id="containerClip">
                    <path
                      className="st0"
                      d={containerPath} // Use the passed path dynamically
                    />
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

      <div className="py-10">
        <h1>Are you happy with your design?</h1>
      </div>

      <div className="flex gap-5">
        <a className="bg-cyan-500 mt-4 px-10 py-3 text-white rounded-full" href="/">
          START OVER
        </a>
        <a
          className="bg-cyan-500 mt-4 px-10 py-3 text-white rounded-full"
          href="/thankyou"
        >
          YES
        </a>
      </div>
    </div>
  );
};

export default ResultContainer;
