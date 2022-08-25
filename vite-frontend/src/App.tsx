import { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";

import { NewTimer } from "./routes/newTimer";
import { TimerMain } from "./routes/Timer";

function App() {
  const routes = (
    <Routes>
      <Route path="/" element={<NewTimer length="00:00" />} />
      <Route path="/timer" element={<TimerMain length="00:00" />} />
      <Route path="/newTimer" element={<NewTimer length="00:00" />} />
      <Route path="/stats" />
    </Routes>
  );

  return <div className="App">{routes}</div>;
}

export default App;
