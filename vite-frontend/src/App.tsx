import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App(props: { timerName: string }) {
  const [count, setCount] = useState(0);

  const title = props.timerName;
  const timer = "3:54";

  return (
    <div className="App">
      <div className="timer-title">{title}</div>
      <div className="timer-time">{timer}</div>
    </div>
  );
}

export default App;
