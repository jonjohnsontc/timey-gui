import "./toolbar-btns.css";
import { ReactElement, useState } from "react";

import { Button } from "../Button";

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
  onClick?: any; // onClick function to pass through to original element
  disabled?: boolean;
  link?: JSX.Element; // The idea of this was a Link element
}

function DeleteBtn(props: ToolbarBtnProps) {
  return (
    <Button name="x" icon="x-lg" cls="delete-btn" action={props.onClick} />
  );
}

const AllTimersBtn = (
  <Button name="all-timers" icon="all-timers" cls="all-timers-btn" />
);

function PlayBtn(props: ToolbarBtnProps) {
  return (
    <Button
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
    <Button
      name="save"
      icon="check-lg"
      cls="save-btn"
      action={props.onClick}
      link={props.link}
    />
  );
}

function NewTimerBtn(props: ToolbarBtnProps) {
  return (
    <Button
      name="new-timer"
      icon="plus"
      cls="new-timer-btn"
      action={props.onClick}
      link={props.link}
    />
  );
}

function RestartBtn(props: ToolbarBtnProps) {
  return (
    <Button
      name="restart"
      icon="arrow-clockwise"
      cls="restart-btn"
      action={props.onClick}
    />
  );
}

const StatsBtn = (
  <Button name="stats" icon="bar-chart-line-fill" cls="stats-btn" />
);

function PauseBtn(props: ToolbarBtnProps) {
  return (
    <Button
      name="pause"
      icon="pause-fill"
      cls="pause-btn"
      action={props.onClick}
    />
  );
}

function EditBtn(props: ToolbarBtnProps) {
  return (
    <Button
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
  Button,
  DeleteBtn,
  PlayBtn,
  SaveBtn,
  NewTimerBtn,
  RestartBtn,
  StatsBtn,
  PauseBtn,
  EditBtn,
};
