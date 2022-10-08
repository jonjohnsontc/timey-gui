import { useState } from "react";
import "./App.css";

import { useEventListener, useInterval } from "./useHooks";
import { getTime, secsToTime, Timer as TK } from "./timer";
import { TimerField } from "./components/TimeKeeper";
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
  timer?: TK;
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
  const [timers, setTimers] = useState<Timey[]>(props.timers);
  const [time, setTime] = useState(timers[idx].length);

  const [mins, secs] = secsToTime(timers[idx].initialTime)
    .split(":")
    .map((x) => parseInt(x));
  const derivedMins = (function () {
    if (timers[idx].timer) {
      const val = timers[idx].timer!.time;
      return val.split(":").map((x) => parseInt(x))[0];
    }
  })();
  const derivedSecs = (function () {
    if (timers[idx].timer) {
      const val = timers[idx].timer!.time;
      return val.split(":").map((x) => parseInt(x))[1];
    }
  })();

  // For now, we'll restrict the timer picker to 5 timers
  const currentLength = timers.length <= 5 ? timers.length : 5;

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
    } else {
      if (key === "n") {
        newTimer();
      } else if (key === "p" && timers[idx].running) {
        pause();
      } else if (key === "p" && !timers[idx].running) {
        play();
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

  // OnClick fn's

  function newTimer() {
    if (timers.length < 5) {
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
    }
  }

  function del() {
    const newTimers = [...timers];
    newTimers.splice(idx, 1);
    setTimers(newTimers);
  }

  function edit() {
    const newTimers = [...timers];
    newTimers.splice(idx, 1, {
      ...timers[idx],
      saved: false,
      timer: undefined,
    });
    setTimers(newTimers);
  }

  function pause() {
    const newTimers = [...timers];
    newTimers.splice(idx, 1, { ...timers[idx], running: false });
    if (timers[idx].timer) {
      newTimers[idx].timer!.stop();
    }
    setTimers(newTimers);
  }

  function play() {
    const newTimers = [...timers];
    newTimers.splice(idx, 1, { ...timers[idx], running: true });
    if (newTimers[idx].timer) {
      newTimers[idx].timer!.tick();
    }
    setTimers(newTimers);
  }

  function restart() {
    const newTimers = [...timers];
    newTimers.splice(idx, 1, {
      ...timers[idx],
      timeRemaining: timers[idx].initialTime,
    });
    if (newTimers[idx].timer) {
      newTimers[idx].timer!.restart();
    }
    setTimers(newTimers);
  }

  function save() {
    if (mins > 0) {
      const newTimers = [...timers];
      const length = `${getTime(mins)}:${getTime(secs)}`;
      newTimers.splice(idx, 1, {
        ...timers[idx],
        length: length,
        saved: true,
        timer: new TK(length, timers[idx].name),
      });
      setTimers(newTimers);
    }
  }

  if (timers[idx].saved) {
    if (!timers[idx].timer) {
      const newTimers = [...timers];
      newTimers.splice(idx, 1, {
        ...timers[idx],
        timer: new TK(timers[idx].length, timers[idx].name),
      });
      setTimers(newTimers);
    }
  }

  useInterval(
    () => {
      if (timers[idx].timer) {
        setTime(timers[idx].timer!.time);
      }
    },
    timers[idx].running ? 1000 : null
  );

  if (Notification.permission != "granted") {
    Notification.requestPermission();
  }

  return (
    <div className="timers">
      <div className="timer-header">
        {timers[idx].saved ? (
          <span className="timer-name">{timers[idx].name}</span>
        ) : (
          <input
            id="timer-name"
            type="text"
            name="name"
            className="timer-name"
            defaultValue={timers[idx].name}
            onChange={(e) => {
              e.preventDefault();
              const newTimer = [...timers];
              newTimer.splice(idx, 1, {
                ...timers[idx],
                name: e.target.value,
              });
              setTimers(newTimer);
            }}
          />
        )}
      </div>
      <div className="timer-sidebar" />
      <div className="timer">
        <UpBtn disabled={timers[idx].saved ? true : false} />
        <TimerField
          saved={timers[idx].saved}
          mins={derivedMins ? derivedMins : mins}
          secs={derivedSecs ? derivedSecs : secs}
          name={timers[idx].name}
        />
        <DownBtn disabled={timers[idx].saved ? true : false} />
      </div>
      <TimerPicker
        disabled={currentLength < 2 ? true : false}
        length={currentLength}
        activeId={timers[idx].saved ? idx : undefined}
        upClick={function () {
          if (idx > 0) {
            setIdx(idx - 1);
          }
        }}
        downClick={function () {
          if (idx != timers.length - 1) {
            setIdx(idx + 1);
          }
        }}
      />
      <Toolbar
        state={calculateToolBarState()}
        playOnClick={() => play()}
        pauseOnClick={() => pause()}
        restartOnClick={() => restart()}
        deleteOnClick={() => del()}
        editOnClick={() => edit()}
        saveOnClick={() => save()}
        newOnClick={() => newTimer()}
      />
    </div>
  );
}

export default Timers;
