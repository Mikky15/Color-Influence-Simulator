import React from "react";
import { useNavigate } from "react-router-dom";
import { swirlingLogo } from "../assets";

const Home = ({ isChecked }) => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-black">
      <div className="w-[90%] lg:w-[50%] mx-auto flex flex-col items-center">
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="flex flex-col items-center space-y-4 p-6 rounded-md shadow-lg">
            <img
              src={swirlingLogo}
              width={100}
              alt="Swirling Logo"
              className="rounded-xl"
            />
            <p className="text-md text-cyan-300 mb-4">
              Color Influence Simulator
            </p>
            <h1 className="text-center text-xl lg:text-4xl">
              Welcome to the Color Influence Simulator! Here you can explore how
              colors and shapes affect your perception of yogurt flavor.
            </h1>
            <div className="flex items-center space-x-2">
              <div
                role="checkbox"
                aria-checked={isChecked}
                onClick={() => navigate("/consent")} // Redirect to Consent page
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="accept"
                  checked={isChecked}
                  readOnly
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="accept" className="text-sm text-white">
                  Consent to Data Usage
                </label>
              </div>
            </div>
            <button
              disabled={!isChecked} // Disable button unless checkbox is checked
              aria-disabled={!isChecked} // Accessibility attribute
              className={`w-3/6 px-4 py-3 rounded-lg text-black ${
                isChecked
                  ? "bg-cyan-500 hover:text-white hover:bg-cyan-700"
                  : "bg-cyan-300 cursor-not-allowed"
              }`}
              onClick={() => {
                if (isChecked) navigate("/flavor"); // Navigate to the Flavor page
              }}
            >
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
