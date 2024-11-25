import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Container1 } from "../assets/Container_1.svg"; // Inline SVGs
import { ReactComponent as Container2 } from "../assets/Container_2.svg";
import { ReactComponent as Container3 } from "../assets/Container_3.svg";
import { ReactComponent as Container4 } from "../assets/Container_4.svg";
import { swirlingLogo } from "../assets";

// Define the containers array with both the label and the Component
const containers = [
  { label: "Parfait Cup", Component: Container1 },
  { label: "Jar", Component: Container2 },
  { label: "Glass", Component: Container3 },
  { label: "Bowl", Component: Container4 },
];

const ContainerPage = ({ setContainer, setContainerPath, setContainerViewBox }) => {
  const navigate = useNavigate();

  // Ref to store the container component dynamically
  const containerRefs = useRef([]);

  // Extract the SVG path and viewBox dynamically from the component
  const handleSelectContainer = (containerObj, index) => {
    const containerRef = containerRefs.current[index];
    
    // Extract path data from the selected container component
    const svgPaths = containerRef.querySelectorAll("path"); 
    const paths = Array.from(svgPaths).map((path) => path.getAttribute("d")); // Get the 'd' attribute for each path

    // Extract the viewBox from the SVG element (it should be set as a string like "0 0 100 100")
    const viewBox = containerRef.querySelector("svg")?.getAttribute("viewBox");

    setContainer(containerObj); // Save the entire container object (label + Component)
    setContainerPath(paths); // Set the path(s) of the selected container
    setContainerViewBox(viewBox); // Set the viewBox of the selected container

    navigate("/result"); // Navigate to the result page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <img src={swirlingLogo} width={100} alt="Logo" className="rounded-xl" />
      <h1 className="text-2xl font-bold mb-4">Choose a Container</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {containers.map((container, index) => (
          <button
            key={index}
            onClick={() => handleSelectContainer(container, index)} // Pass the entire container object
            className="flex flex-col items-center space-y-2 p-4 rounded-xl"
          >
            {/* Render the container with a ref to access its SVG paths and viewBox */}
            <div className="w-32 h-32" ref={(el) => (containerRefs.current[index] = el)}>
              <container.Component className="w-full h-full object-contain" />
            </div>
            <span>{container.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContainerPage;