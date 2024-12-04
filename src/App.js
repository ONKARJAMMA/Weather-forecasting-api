import React from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        <a href="https://github.com/ONKARJAMMA/REALTIME-WEATHER-FORECASTING-USING-API">
          Download Source Code
        </a>{" "}
        | Developed by{" "}
        <a
          target="_blank"
          href="https://www.linkedin.com/in/onkar-jamma-616010258/"
          rel="noopener noreferrer"
        >
          ONKAR JAMMA
        </a>
      </div>
    </React.Fragment>
  );
}

export default App;
