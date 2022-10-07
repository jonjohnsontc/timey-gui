import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// loads timers from store
function loadTimers() {
  // calling the store specifically
  const timers = [];

  // if there is no timer we'll just push some blank timer data into the component
  if (timers.length === 0) {
    timers.push({
      saved: false,
      length: "00:00",
      name: "",
      finished: false,
      running: false,
      initialTime: 0,
      timeRemaining: 0,
    });
  }
  return timers;
}

const timers = loadTimers();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App timers={timers} />
  </React.StrictMode>
);
