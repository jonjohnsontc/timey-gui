import { ReactElement, useState } from "react";

import { Up, Down } from "../TimerBtns";
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
  const getTime = (num: Number) => {
    if (num < 10) {
      return "0" + num.toString();
    } else {
      return num.toString();
    }
  };

  const [minsVal, secsVal] = props.length.split(":").map((x) => Number(x));
  const [time, setTime] = useState({ mins: minsVal, secs: secsVal });

  const minsField = <span className="timer-mins">{getTime(time.mins)}</span>;
  const secsField = <span className="timer-secs">{getTime(time.secs)}</span>;

  let titleField: ReactElement;
  let up: ReactElement | undefined;
  let down: ReactElement | undefined;

  const increment = () => {
    if (time.mins < 100) {
      setTime({ ...time, mins: time.mins + 1 });
    }
  };

  const decrement = () => {
    if (time.mins > 0) {
      setTime({ ...time, mins: time.mins - 1 });
    }
  };

  if (props.saved) {
    up = undefined;
    down = undefined;
    // TODO: Want an easy way to name unnamed timers
    titleField = <span>{props.name || "1"}</span>;
  } else {
    up = <Up onClick={() => increment()} />;
    down = <Down onClick={() => decrement()} />;
    titleField = (
      <input type="text" name="name" id="name" className="timer-name" />
    );
  }

  return (
    <div className="timer">
      <div className="timer-header">{titleField}</div>
      {up}
      <div className="container">
        <div className="timer-time">
          {minsField}
          <span>:</span>
          {secsField}
        </div>
      </div>
      {down}
    </div>
  );
}

export { Timer };
