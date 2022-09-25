import { useState } from "react";
import "./App.css";

import { useEventListener } from "./events";
import { getTime, secsToTime } from "./timer";
import { Timer } from "./components/Timer";
import { TimerPicker } from "./components/TimerPicker";
import { Button } from "./components/Button";
import { Toolbar } from "./components/Toolbar";
import { TimerStates } from "./components/TimerStates";

// Represents a timer for the top-level timers component
interface Timey {
  saved: boolean;
  finished: boolean;
  running: boolean;
  length: string;
  name: string;
  initialTime: number;
  timeRemaining: number;
}

const { Unsaved, Paused, Finished, Running } = TimerStates;

/**
 * A view that organizes all timers into a list, and adds new timers to the end
 * of it. It is primarily made out of three components, the Timer, TimerPicker, and
 * Toolbar.
 *
 * - Timer displays the time and counts down
 * - TimerPicker allows the user to pick the timer
 * - Toolbar allows the user to interact with the timers
 */
function Timers(props: { timers: Timey[] }) {
  // Declaring all the state that is controlled within the component
  // tracks current timer in view
  const [idx, setIdx] = useState(0);
  const [timers, setTimers] = useState(props.timers);
  const [mins, secs] = secsToTime(timers[idx].initialTime)
    .split(":")
    .map((x) => parseInt(x));

  const currentlySaved = timers[idx].saved;

  // For now, we'll restrict the timer picker to 5 timers
  const currentLength = timers.length <= 5 ? timers.length : 5;

  // Controls for the current timer are here

  /**
   * Increases current timer value by 1 minute
   */
  function increment() {
    if (mins < 100) {
      const newTimers = Array.from(timers);
      newTimers.splice(idx, 1, {
        ...newTimers[idx],
        initialTime: newTimers[idx].initialTime + 60,
      });
      setTimers(newTimers);
    }
  }

  /**
   * Decreases current timer value by 1 minute
   */
  function decrement() {
    if (mins > 0) {
      const newTimers = Array.from(timers);
      newTimers.splice(idx, 1, {
        ...newTimers[idx],
        initialTime: newTimers[idx].initialTime - 60,
      });
      setTimers(newTimers);
    }
  }

  // @ts-ignore { key } type
  // https://stackoverflow.com/a/57926311/10051144
  const timeKeyHandler = ({ key }) => {
    const numberKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    if (!timers[idx].saved) {
      if (key === "38" || key === "ArrowUp") {
        increment();
      } else if (key === "40" || key === "ArrowDown") {
        decrement();
      } else if (numberKeys.includes(key)) {
        console.log(key);
      }
    }
  };
  useEventListener("keydown", timeKeyHandler);

  /**
   * The button that controls incrementing the timer value up
   * */
  function UpBtn(props: { disabled: boolean }) {
    return (
      <Button
        icon="chevron-compact-up"
        action={() => {
          increment();
        }}
        disabled={props.disabled}
        cls="time-button"
      />
    );
  }

  /**
   * The button that controls decreasing the timer value
   * */
  function DownBtn(props: { disabled: boolean }) {
    return (
      <Button
        icon="chevron-compact-down"
        action={() => {
          decrement();
        }}
        disabled={props.disabled}
        cls="time-button"
      />
    );
  }

  function calculateToolBarState() {
    if (!timers[idx].saved) {
      return Unsaved;
    } else if (!timers[idx].running) {
      return Paused;
    } else {
      return Running;
    }
  }

  return (
    <div className="timers">
      <div className="timer-header">
        {currentlySaved ? (
          <span className="timer-name">{timers[idx].name}</span>
        ) : (
          <input
            id="timer-name"
            type="text"
            name="name"
            className="timer-name"
            onChange={(e) => {
              e.preventDefault();
              const newTimer = [...timers];
              newTimer.splice(idx, 1, { ...timers[idx], name: e.target.value });
              setTimers(newTimer);
            }}
          />
        )}
      </div>
      <div className="timer-sidebar" />
      <div className="timer">
        <UpBtn disabled={timers[idx].saved ? true : false} />
        <Timer
          saved={timers[idx].saved}
          mins={mins}
          secs={secs}
          name={timers[idx].name}
        />
        <DownBtn disabled={timers[idx].saved ? true : false} />
      </div>
      <TimerPicker
        disabled={currentLength < 2 ? true : false}
        length={currentLength}
        activeId={currentlySaved ? idx : undefined}
        upClick={function () {
          // artificially limiting to 5 timers
          if (idx < timers.length && idx < 5) {
            setIdx(idx + 1);
          }
        }}
        downClick={function () {
          if (idx > timers.length) {
            setIdx(idx - 1);
          }
        }}
      />
      <Toolbar
        state={calculateToolBarState()}
        playOnClick={() => {
          const newTimers = [...timers];
          newTimers.splice(idx, 1, { ...timers[idx], running: true });
          setTimers(newTimers);
        }}
        pauseOnClick={() => {
          const newTimers = [...timers];
          newTimers.splice(idx, 1, { ...timers[idx], running: false });
          setTimers(newTimers);
        }}
        restartOnClick={() => {
          const newTimers = [...timers];
          newTimers.splice(idx, 1, {
            ...timers[idx],
            timeRemaining: timers[idx].initialTime,
          });
          setTimers(newTimers);
        }}
        deleteOnClick={() => {
          const newTimers = [...timers];
          newTimers.splice(idx, 1);
          setTimers(newTimers);
        }}
        editOnClick={() => {
          const newTimers = [...timers];
          newTimers.splice(idx, 1, { ...timers[idx], saved: false });
          setTimers(newTimers);
        }}
        saveOnClick={() => {
          if (mins > 0) {
            const newTimers = [...timers];
            const length = `${getTime(mins)}:${getTime(secs)}`;
            newTimers.splice(idx, 1, {
              ...timers[idx],
              length: length,
              saved: true,
            });
            setTimers(newTimers);
          }
        }}
        newOnClick={() => {
          setTimers(
            timers.concat({
              saved: false,
              length: "00:00",
              name: "",
              running: false,
              finished: false,
              initialTime: 0,
              timeRemaining: 0,
            })
          );
          setIdx(idx + 1);
        }}
      />
    </div>
  );
}

export default Timers;
