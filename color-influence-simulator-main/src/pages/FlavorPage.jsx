import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { swirlingLogo } from "../assets";

const flavors = [
  { label: "Sweet", value: "Mild, Creamy, Floral." },
  { label: "Sour", value: "Tangy, Zesty, Sharp." },
  { label: "Bitter", value: "Earthy, Deep, Balanced." },
  { label: "Salty", value: "Rich, Intense, Oceanic." },
  { label: "Umami", value: "Meaty, Enriching, Savory." },
];

const FlavorPage = ({ flavor, setFlavor }) => {
  const navigate = useNavigate();
  const [selectedFlavor, setSelectedFlavor] = useState(flavor || ""); // Pre-select if flavor exists

  const handleSelect = (flavor) => {
    setSelectedFlavor(flavor);
    setFlavor(flavor); // Update parent state
  };

  const handleNext = () => {
    if (selectedFlavor) {
      navigate("/color"); // Navigate to the next page
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      {/* Logo */}
      <img src={swirlingLogo} width={100} alt="Logo" className="rounded-xl mb-4" />

      {/* Heading */}
      <h1 className="text-2xl font-bold mb-6">Choose a flavor for your yogurt</h1>

      {/* Flavor Options */}
      <div className="flex flex-col space-y-4">
        {flavors.map((flavorOption, index) => (
          <button
            key={index}
            className={`p-4 rounded-lg text-lg font-semibold ${
              selectedFlavor === flavorOption.label ? "bg-cyan-500" : "bg-gray-700"
            } hover:bg-cyan-400 transition`}
            onClick={() => handleSelect(flavorOption.label)}
          >
            <div className="text-center">
              {flavorOption.label}
              <p className="text-sm text-gray-300">{flavorOption.value}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!selectedFlavor}
        className={`mt-6 px-8 py-3 text-lg font-semibold rounded-full transition ${
          selectedFlavor
            ? "bg-cyan-500 hover:bg-green-700 text-white"
            : "bg-gray-500 text-gray-300 cursor-not-allowed"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default FlavorPage;
