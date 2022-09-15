import { useState } from "react";
import "./App.css";

import { useEventListener } from "./events";
import { convertToSecs, getTime } from "./timer";
import { Timer } from "./components/Timer";
import { TimerPicker } from "./components/TimerPicker";
import { Button } from "./components/Button";
import { Toolbar } from "./components/Toolbar";
import { TimerStates } from "./components/TimerStates";
import { Down } from "./components/TimerBtns";

// Represents a timer for the top-level timers component
interface Timey {
  saved: boolean;
  finished: boolean;
  running: boolean;
  length: string;
  name: string;
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
  const [name, setName] = useState(timers[idx].name);

  const [minsVal, secsVal] = timers[idx].length
    .split(":")
    .map((x) => Number(x));
  const [time, setTime] = useState({ mins: minsVal, secs: secsVal });

  const currentlySaved = timers[idx].saved;
  const currentLength = timers.length;

  // The folowing controls the value of the timer
  function increment() {
    if (time.mins < 100) {
      setTime({ ...time, mins: time.mins + 1 });
    }
  }

  function decrement() {
    if (time.mins > 0) {
      setTime({ ...time, mins: time.mins - 1 });
    }
  }

  // @ts-ignore { key } type
  // https://stackoverflow.com/a/57926311/10051144
  const timeKeyHandler = ({ key }) => {
    if (!timers[idx].saved) {
      if (key === "38" || key === "ArrowUp") {
        increment();
      } else if (key === "40" || key === "ArrowDown") {
        decrement();
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
            type="text"
            name="name"
            className="timer-name"
            onChange={(e) => {
              e.preventDefault();
              setName(e.target.value);
            }}
          />
        )}
      </div>
      <div className="timer-sidebar" />
      <div className="timer">
        <UpBtn disabled={timers[idx].saved ? true : false} />
        <Timer
          saved={timers[idx].saved}
          mins={time.mins}
          secs={time.secs}
          name={timers[idx].name}
        />
        <DownBtn disabled={timers[idx].saved ? true : false} />
      </div>
      <TimerPicker
        disabled={currentLength < 2 ? true : false}
        length={currentLength}
        activeId={currentlySaved ? idx : undefined}
        upClick={function () {
          if (idx < timers.length) {
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
        playOnClick={() => {}}
        pauseOnClick={() => {}}
        restartOnClick={() => {}}
        deleteOnClick={() => {}}
        editOnClick={() => {}}
        saveOnClick={() => {
          const newTimers = [...timers];
          const length = `${getTime(time.mins)}:${getTime(time.secs)}`;
          newTimers.splice(idx, 1, {
            saved: true,
            name: name,
            length: length,
            running: false,
            finished: false,
          });
          setTimers(newTimers);
        }}
        newOnClick={() => {
          setTimers(
            timers.concat({
              saved: false,
              length: "00:00",
              name: "",
              running: false,
              finished: false,
            })
          );
          setIdx(idx + 1);
        }}
      />
    </div>
  );
}

export default Timers;
