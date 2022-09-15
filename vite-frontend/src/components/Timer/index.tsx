import "./timer.css";

interface TimerProps {
  saved: boolean;
  mins: number;
  secs: number;
  name: string;
}

/**
 * Component that controls a timer
 *
 * */
function Timer(props: TimerProps) {
  /**
   * Translates time number to display format
   */
  const getTime = (num: Number) => {
    if (num < 10) {
      return "0" + num.toString();
    } else {
      return num.toString();
    }
  };

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

export { Timer };
export type { TimerProps };
