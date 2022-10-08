import "./timer.css";
import { getTime } from "../../timer";

interface TimerFieldProps {
  saved: boolean;
  mins: number;
  secs: number;
  name: string;
}

/**
 * I wanna change this component up, so that it keeps the state of the 
 * actual time, rather than having it be set from a prop.
 * 
 * Rather, pause and play will be prop based
 ** / 


/**
 * Component that shows the time of the current timer
 *
 * */
function TimerField(props: TimerFieldProps) {
  return (
    <div className="container">
      <div className="timer-time">
        <span className="timer-mins">{getTime(props.mins)}</span>
        <span>:</span>
        <span className="timer-secs">{getTime(props.secs)}</span>
      </div>
    </div>
  );
}

export { TimerField };
export type { TimerFieldProps };
