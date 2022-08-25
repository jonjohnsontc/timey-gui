import "./toolbar-btns.css";
import { useState } from "react";

// root path of the icons file
const iconsLoc = "/src/assets/icons.svg#";

interface BtnProps {
  // TODO: 'name' has no function right now
  name: string;
  icon: string;
  disabled?: boolean;
  action?: () => void;
  cls?: string;
}

function ToolbarBtn(props: BtnProps) {
  let cls = props.cls;

  // Controls whether or not the button "bounces"
  const [animated, setAnimated] = useState(false);
  let onClick, onAnimationEnd;
  if (props.disabled) {
    onClick = () => {};
    onAnimationEnd = () => {};
    cls += " disabled";
  } else {
    onClick = () => setAnimated(() => true);
    onAnimationEnd = () => setAnimated(() => false);
  }

  return (
    <button className="toolbar-btn" onClick={props.action}>
      <svg
        // Each button has a ping animation to feel more alive
        className={animated ? cls + " pulsate-bck" : cls}
        onClick={onClick}
        onAnimationEnd={onAnimationEnd}
      >
        <use href={`${iconsLoc}${props.icon}`}></use>
      </svg>
    </button>
  );
}

/*
 * Each of the buttons that makes up the toolbar:
 *  - all-timers
 *  - play
 *  - pause
 *  - restart
 *  - add-timer
 *  - delete
 *  - stats
 * */

interface ToolbarBtnProps {
  onClick?: () => void;
  disabled?: boolean;
}

function DeleteBtn(props: ToolbarBtnProps) {
  return (
    <ToolbarBtn name="x" icon="x-lg" cls="delete-btn" action={props.onClick} />
  );
}

const AllTimersBtn = (
  <ToolbarBtn name="all-timers" icon="all-timers" cls="all-timers-btn" />
);

function PlayBtn(props: ToolbarBtnProps) {
  return (
    <ToolbarBtn
      name="play"
      icon="caret-right-fill"
      cls="play-btn"
      action={props.onClick}
      disabled={props.disabled}
    />
  );
}

function SaveBtn(props: ToolbarBtnProps) {
  return (
    <ToolbarBtn
      name="save"
      icon="check-lg"
      cls="save-btn"
      action={props.onClick}
    />
  );
}

function NewTimerBtn(props: ToolbarBtnProps) {
  return (
    <ToolbarBtn
      name="new-timer"
      icon="plus"
      cls="new-timer-btn"
      action={props.onClick}
    />
  );
}

function RestartBtn(props: ToolbarBtnProps) {
  return (
    <ToolbarBtn
      name="restart"
      icon="arrow-clockwise"
      cls="restart-btn"
      action={props.onClick}
    />
  );
}

const StatsBtn = (
  <ToolbarBtn name="stats" icon="bar-chart-line-fill" cls="stats-btn" />
);

function PauseBtn(props: ToolbarBtnProps) {
  return (
    <ToolbarBtn
      name="pause"
      icon="pause-fill"
      cls="pause-btn"
      action={props.onClick}
    />
  );
}

function EditBtn(props: ToolbarBtnProps) {
  return (
    <ToolbarBtn
      name="edit"
      icon="pen-fill"
      cls="edit-btn"
      action={props.onClick}
      disabled={props.disabled}
    />
  );
}

export {
  AllTimersBtn,
  ToolbarBtn,
  DeleteBtn,
  PlayBtn,
  SaveBtn,
  NewTimerBtn,
  RestartBtn,
  StatsBtn,
  PauseBtn,
  EditBtn,
};
export type { BtnProps };
