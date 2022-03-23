import React from "react";
import Videos from "./Videos";
import "./Styles/app.css";

const App = () => {
  return (
    <div className="container">
      <div className="video__container">
        <Videos />
        <Videos />
        <Videos />
        <Videos />
        <Videos />
        <Videos />
      </div>
    </div>
  );
};

export default App;
