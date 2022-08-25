import { useEffect, useState } from "react";
import { Timer } from "../components/Timer";
import { Toolbar } from "../components/Toolbar";
import {
  PlayBtn,
  PauseBtn,
  NewTimerBtn,
  RestartBtn,
  EditBtn,
} from "../components/ToolbarBtns";

interface MainTimerProps {
  length: string;
  finished?: boolean;
}

function TimerMain(props: MainTimerProps) {
  // This just controls whether there is a play or pause button in ui
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);

  // I think there needs to be some kind of trigger to set finished to true
  // Maybe not on this btn, but somewhere in this component
  const CenterBtn = () => {
    if (finished) {
      return (
        <RestartBtn
          onClick={() => {
            setFinished(false);
            setRunning(true);
          }}
        />
      );
    } else if (running) {
      return <PauseBtn onClick={() => setRunning(false)} />;
    } else {
      return <PlayBtn onClick={() => setRunning(true)} />;
    }
  };

  return (
    <>
      <Timer saved={true} length={props.length} />
      <Toolbar
        left={running ? <EditBtn disabled={true} /> : <EditBtn />}
        right={<NewTimerBtn />}
        middle={<CenterBtn />}
      />
    </>
  );
}

export { TimerMain };
