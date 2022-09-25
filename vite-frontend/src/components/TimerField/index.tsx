import "./timer.css";
import { getTime } from "../../timer";

interface TimerFieldProps {
  saved: boolean;
  mins: number;
  secs: number;
  name: string;
}

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
