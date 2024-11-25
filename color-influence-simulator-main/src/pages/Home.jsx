import React, { useState } from "react";
import { swirlingLogo } from "../assets";

const Home = () => {
  const [isChecked, setIsChecked] = useState(false); // Tracks checkbox state
  const [hasAccepted, setHasAccepted] = useState(false); // Tracks acceptance

  const handleAccept = () => {
    if (isChecked) {
      setHasAccepted(true);
    }
  };

  return (
    <section className="min-h-screen bg-black">
      <div className="w-[90%] lg:w-[50%] mx-auto flex flex-col items-center">
        
          <div className="min-h-screen flex items-center justify-center bg-black text-white">
            {!hasAccepted ? (
              <div className="flex flex-col items-center space-y-4 p-6 rounded-md shadow-lg">
                <img src={swirlingLogo} width={100} alt="" className="rounded-xl" />
                <p className="text-md text-cyan-300 mb-4">Color Influence Simulator</p>
                <h1 className="text-center text-xl lg:text-4xl">
                  Welcome to the Color Influence Simulator! Here you can explore
                  how colors and shapes affect your perception of yoghurt
                  flavour.
                </h1>{" "}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="accept"
                    checked={isChecked}
                    onChange={(e) => setIsChecked(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="accept" className="text-sm">
                    Consent to Data Usage{" "}
                  </label>
                </div>
                <button
                  onClick={handleAccept}
                  disabled={!isChecked} // Disable button unless checkbox is checked
                  className={`w-3/6 px-4 py-3 rounded-lg text-black ${
                    isChecked
                      ? "bg-cyan-500 hover:bg-cyan-700"
                      : "bg-cyan-300 cursor-not-allowed"
                  }`}
                >
                  Start Exploring
                </button>
              </div>
            ) : (
              (window.location.href = "Flavor")
            )}
          </div>
      </div>
    </section>
  );
};

export default Home;
