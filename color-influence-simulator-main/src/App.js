import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  ColorPage,
  ContainerPage,
  FlavorPage,
  Home,
  ResultContainer,
  ShapePage,
  ThankYou,
} from "./pages";

function App() {
  // State management for different selections
  const [flavor, setFlavor] = React.useState(""); // Flavor state
  const [color, setColor] = React.useState("#ffffff"); // Default color state
  const [shape, setShape] = React.useState(null); // Shape state
  const [container, setContainer] = React.useState(null); // Container state
  const [containerPath, setContainerPath] = React.useState(""); // Separate state for containerPath
  const [containerViewBox, setContainerViewBox] = React.useState(""); // Separate state for containerViewBox

  return (
    <Router>
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home />} />
        
        {/* Flavor selection route */}
        <Route
          path="/flavor"
          element={<FlavorPage flavor={flavor} setFlavor={setFlavor} />}
        />
        
        {/* Color selection route */}
        <Route
          path="/color"
          element={<ColorPage color={color} setColor={setColor} />}
        />
        
        {/* Shape selection route */}
        <Route
          path="/shape"
          element={<ShapePage shape={shape} setShape={setShape} />}
        />
        
        {/* Container selection route */}
        <Route
          path="/container"
          element={
            <ContainerPage
              setContainer={setContainer} // Pass the state setter
              setContainerPath={setContainerPath} // Pass the setter for SVG path
              setContainerViewBox={setContainerViewBox}
              color={color} // Pass selected color to ContainerPage
            />
          }
        />
        
        {/* Result route */}
        <Route
          path="/result"
          element={
            <ResultContainer
              flavor={flavor}
              color={color} // Pass selected color to result
              shape={shape}
              container={container} // Pass entire selected container object
              containerPath={containerPath} // Pass the SVG path to result
              containerViewBox={containerViewBox}
            />
          }
        />
        
        {/* Thank You page route */}
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
