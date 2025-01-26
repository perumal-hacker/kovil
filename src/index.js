import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom"; // Import Router
import App from "./App"; // Import your App component

// Render the app inside the Router component
ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <App />
  </Router>
);
