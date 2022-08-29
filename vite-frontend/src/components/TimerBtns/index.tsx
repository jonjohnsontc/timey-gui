import { Button } from "../Button";
import "./timerbtn.css";

interface TimerBtnProps {
  onClick?: () => void | (() => void[]);
  onAnimationEnd?: () => void | (() => void[]);
}

function Up(props: TimerBtnProps) {
  return (
    <Button
      icon="chevron-compact-up"
      name="up"
      cls="up-btn"
      action={props.onClick}
    />
  );
}

function Down(props: TimerBtnProps) {
  return (
    <Button
      icon="chevron-compact-down"
      name="down"
      cls="down-btn"
      action={props.onClick}
    />
  );
}

export { Up, Down };
