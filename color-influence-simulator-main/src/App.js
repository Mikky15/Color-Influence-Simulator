import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  ColorPage,
  ContainerPage,
  FlavorPage,
  Home,
  FeedbackCard,
  ResultContainer,
  ShapePage,
  ThankYou,
  AdminFeedback,
  AdminLogin,
  Consent,
} from "./pages";

function App() {
  const [flavor, setFlavor] = React.useState("");
  const [color, setColor] = React.useState("#ffffff");
  const [shape, setShape] = React.useState(null);
  const [shapeColor, setShapeColor] = React.useState("#000000"); // Shape color state
  const [container, setContainer] = React.useState(null);
  const [containerPath, setContainerPath] = React.useState("");
  const [containerViewBox, setContainerViewBox] = React.useState("");
  const [consentAccepted, setConsentAccepted] = React.useState(false);

  return (
    <Router>
      <Routes>
        {/* Pass both isChecked and setConsentAccepted to Home */}
        <Route
          path="/"
          element={
            <Home isChecked={consentAccepted} setConsentAccepted={setConsentAccepted} />
          }
        />
        <Route
          path="/flavor"
          element={<FlavorPage flavor={flavor} setFlavor={setFlavor} />}
        />
        <Route
          path="/color"
          element={<ColorPage color={color} setColor={setColor} />}
        />
        <Route
          path="/shape"
          element={
            <ShapePage
              shape={shape}
              setShape={setShape}
              shapeColor={shapeColor}
              setShapeColor={setShapeColor} // Pass shape color setter
            />
          }
        />
        <Route
          path="/container"
          element={
            <ContainerPage
              setContainer={setContainer}
              setContainerPath={setContainerPath}
              setContainerViewBox={setContainerViewBox}
              color={color}
            />
          }
        />
        <Route
          path="/result"
          element={
            <ResultContainer
              flavor={flavor}
              color={color}
              shape={shape}
              shapeColor={shapeColor} // Pass the shape's color
              container={container}
              containerPath={containerPath}
              containerViewBox={containerViewBox}
            />
          }
        />
        {/* Pass setConsentAccepted to Consent */}
        <Route
          path="/consent"
          element={<Consent setConsentAccepted={setConsentAccepted} />}
        />
        <Route path="/feedback" element={<FeedbackCard />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin-feedback" element={<AdminFeedback />} />
      </Routes>
    </Router>
  );
}

export default App;
