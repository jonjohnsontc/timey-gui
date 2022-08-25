import { ReactElement, useState } from "react";
import "./timer.css";

interface TimerProps {
  saved: boolean;
  length: string;
  name?: string;
}

/**
 * Component that controls a timer
 *
 * If the timer has been saved, the timer displays it's name and time
 * in a div, else it's a user editable field
 *
 * */
function Timer(props: TimerProps) {
  const [minsVal, secsVal] = props.length.split(":");

  let titleField: ReactElement;
  let minsField: ReactElement;
  let secsField: ReactElement;
  if (props.saved) {
    // TODO: Want an easy way to name unnamed timers
    titleField = <span>{props.name || "1"}</span>;
    minsField = <span className="timer-mins">{minsVal}</span>;
    secsField = <span className="timer-secs">{secsVal}</span>;
  } else {
    titleField = (
      <input type="text" name="name" id="name" className="timer-name" />
    );
    minsField = (
      <input
        type="text"
        name="timer-mins"
        id="timer-mins"
        maxLength={2}
        defaultValue={minsVal}
      />
    );
    secsField = (
      <input
        type="text"
        name="timer-secs"
        id="timer-secs"
        maxLength={2}
        defaultValue={secsVal}
      />
    );
  }

  return (
    <div className="timer">
      <div className="timer-header">{titleField}</div>
      <div className="container">
        <div className="timer-time">
          {minsField}
          <span>:</span>
          {secsField}
        </div>
      </div>
    </div>
  );
}

export { Timer };
