import React from "react";
import { ChromePicker } from "react-color";
import { useNavigate } from "react-router-dom";
import { swirlingLogo } from "../assets";

const ColorPage = ({ color, setColor }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <img src={swirlingLogo} width={100} alt="Logo" className="rounded-xl" />
      <h1 className="text-2xl font-bold mb-4">Select a Color</h1>
      <ChromePicker
        color={color}
        onChange={(updatedColor) => setColor(updatedColor.hex)}
        className="shadow-lg rounded-md"
      />
      <button
        className="mt-6 px-6 py-3 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-600"
        onClick={() => navigate("/shape")} 
      >
        Next
      </button>
    </div>
  );
};

export default ColorPage;