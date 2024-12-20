import React from "react";
import { useNavigate } from "react-router-dom";
import { swirlingLogo } from "../assets";

const Consent = ({ setConsentAccepted }) => {
  const navigate = useNavigate();

  const handleConsent = () => {
    setConsentAccepted(true); // Update consent state
    navigate("/"); // Redirect back to Home
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0b1224] to-[#1c1f3b] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-lg bg-[#14182b] p-8 rounded-lg shadow-2xl">
        <div className="flex justify-center mb-6">
          <img
            src={swirlingLogo}
            alt="App Logo"
            className="w-20 h-20 rounded-full shadow-md"
          />
        </div>
        <h1 className="text-center text-2xl lg:text-3xl font-bold mb-6 leading-snug">
          Consent to Data Usage
        </h1>
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Brief Explanation:</h2>
          <p className="text-sm leading-7 text-gray-300">
            This app collects information about your design choices, color
            selections, and responses to questions. The data will be used
            anonymously in research to explore how colors affect the perception
            of products.
          </p>
        </div>

        {/* Data Details */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">What the Data Includes:</h2>
          <p className="text-sm leading-7 text-gray-300">
            We store information such as color choices, graphic designs, and
            your answers. Your data will remain anonymous and cannot be traced
            back to you.
          </p>
        </div>

        {/* Rights */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Your Rights:</h2>
          <p className="text-sm leading-7 text-gray-300">
            You can withdraw your consent at any time by contacting us. This
            will not affect your results in the app.
          </p>
        </div>

        {/* Consent Call-to-Action */}
        <div className="text-center">
          <p className="mb-4 text-sm text-gray-300">
            By clicking "I consent," you agree to allow your data to be used for
            research purposes.
          </p>
          <div className="flex flex-col space-y-4">
            {/* Consent Button */}
            <button
              onClick={handleConsent} // Trigger consent handling
              aria-label="Consent to data usage"
              className="w-full text-xl py-3 bg-gradient-to-r from-customAqua to-customDarkAqua text-black font-bold rounded-lg hover:opacity-90 transition-transform transform hover:scale-105"
            >
              I consent
            </button>
            {/* Decline Button */}
            <button
              onClick={() => navigate("/")}
              aria-label="Decline data usage"
              className="mt-4 text-sm text-cyan-300 hover:underline"
            >
              I don’t consent
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Consent;
